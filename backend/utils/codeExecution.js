const { spawn } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const executeCode = async (code, language) => {
  const tempDir = path.join(__dirname, '..', 'temp');
  const fileName = uuidv4();
  const startTime = Date.now();

  try {
    // Ensure temp directory exists
    await fs.mkdir(tempDir, { recursive: true });

    let filePath, command, args;

    switch (language.toLowerCase()) {
      case 'javascript':
      case 'js':
        filePath = path.join(tempDir, `${fileName}.js`);
        await fs.writeFile(filePath, code);
        command = 'node';
        args = [filePath];
        break;

      case 'python':
      case 'py':
        filePath = path.join(tempDir, `${fileName}.py`);
        await fs.writeFile(filePath, code);
        command = 'python3';
        args = [filePath];
        break;

      case 'java':
        filePath = path.join(tempDir, `${fileName}.java`);
        // Extract class name from code
        const classMatch = code.match(/public\s+class\s+(\w+)/);
        const className = classMatch ? classMatch[1] : 'Main';
        const javaCode = code.includes('public class') ? code : `public class ${className} {\n${code}\n}`;
        await fs.writeFile(filePath, javaCode);
        
        // Compile first
        const compileResult = await runCommand('javac', [filePath]);
        if (compileResult.error) {
          return {
            output: '',
            error: compileResult.error,
            executionTime: Date.now() - startTime
          };
        }
        
        command = 'java';
        args = ['-cp', tempDir, className];
        break;

      case 'cpp':
      case 'c++':
        filePath = path.join(tempDir, `${fileName}.cpp`);
        const execPath = path.join(tempDir, fileName);
        await fs.writeFile(filePath, code);
        
        // Compile first
        const cppCompileResult = await runCommand('g++', [filePath, '-o', execPath]);
        if (cppCompileResult.error) {
          return {
            output: '',
            error: cppCompileResult.error,
            executionTime: Date.now() - startTime
          };
        }
        
        command = execPath;
        args = [];
        break;

      default:
        return {
          output: '',
          error: `Unsupported language: ${language}`,
          executionTime: Date.now() - startTime
        };
    }

    const result = await runCommand(command, args, 10000); // 10 second timeout
    
    // Cleanup
    try {
      if (filePath) await fs.unlink(filePath);
      if (language.toLowerCase() === 'java') {
        const classFile = path.join(tempDir, `${fileName}.class`);
        try {
          await fs.unlink(classFile);
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      if (language.toLowerCase() === 'cpp') {
        try {
          await fs.unlink(path.join(tempDir, fileName));
        } catch (e) {
          // Ignore cleanup errors
        }
      }
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    return {
      output: result.output,
      error: result.error,
      executionTime: Date.now() - startTime
    };

  } catch (error) {
    console.error('Code execution error:', error);
    return {
      output: '',
      error: error.message,
      executionTime: Date.now() - startTime
    };
  }
};

const runCommand = (command, args, timeout = 5000) => {
  return new Promise((resolve) => {
    let output = '';
    let error = '';
    let isResolved = false;

    const child = spawn(command, args, {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        child.kill();
        isResolved = true;
        resolve({
          output: '',
          error: 'Execution timeout (maximum 10 seconds)'
        });
      }
    }, timeout);

    child.stdout.on('data', (data) => {
      output += data.toString();
    });

    child.stderr.on('data', (data) => {
      error += data.toString();
    });

    child.on('close', (code) => {
      if (!isResolved) {
        clearTimeout(timeoutId);
        isResolved = true;
        resolve({
          output: output.trim(),
          error: error.trim() || (code !== 0 ? `Process exited with code ${code}` : '')
        });
      }
    });

    child.on('error', (err) => {
      if (!isResolved) {
        clearTimeout(timeoutId);
        isResolved = true;
        resolve({
          output: '',
          error: err.message
        });
      }
    });
  });
};

module.exports = { executeCode };

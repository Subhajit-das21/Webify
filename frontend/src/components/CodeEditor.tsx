import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  Avatar,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import {
  PlayArrow,
  Save,
  Share,
  Code,
  Terminal,
  People,
  Settings,
  Add,
  Close,
} from '@mui/icons-material';
import Editor from '@monaco-editor/react';

interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  cursor: { line: number; column: number };
  color: string;
}

const CodeEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [language, setLanguage] = useState('javascript');
  const [showTerminal, setShowTerminal] = useState(true);
  const [output, setOutput] = useState('');
  const editorRef = useRef<any>(null);

  const [codeFiles, setCodeFiles] = useState<CodeFile[]>([
    {
      id: '1',
      name: 'main.js',
      language: 'javascript',
      content: `// Welcome to Collaborative Code Editor
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci sequence:');
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}

// Real-time collaboration features:
// - Live cursor tracking
// - Instant code synchronization  
// - Voice/video chat integration
// - AI-powered code suggestions`
    },
    {
      id: '2',
      name: 'styles.css',
      language: 'css',
      content: `/* Collaborative Styling */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.editor-panel {
  flex: 1;
  background: #1e1e1e;
  color: #d4d4d4;
}

/* Real-time collaboration indicators */
.cursor-indicator {
  position: absolute;
  width: 2px;
  height: 20px;
  background: var(--user-color);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}`
    },
    {
      id: '3',
      name: 'README.md',
      language: 'markdown',
      content: `# Remote Team Collaboration Dashboard

## Features

### 🚀 Code Editor Integration
- **VS Code Monaco Editor** - Full IDE experience in browser
- **Multi-language Support** - JavaScript, Python, CSS, HTML, Markdown
- **Syntax Highlighting** - Professional code editing
- **IntelliSense** - Smart code completion

### 👥 Real-time Collaboration  
- **Live Cursor Tracking** - See where teammates are working
- **Instant Sync** - Code changes appear instantly
- **Voice/Video Chat** - Built-in communication
- **Screen Sharing** - Share your screen for debugging

### 🤖 AI Integration
- **Code Completion** - AI-powered suggestions
- **Bug Detection** - Automatic error spotting
- **Code Review** - AI-assisted code analysis
- **Documentation** - Auto-generate comments

### 📁 File Management
- **Version Control** - Git-like branching and merging
- **File History** - Track all changes
- **Project Structure** - Organized file system
- **Cloud Sync** - Never lose your work

## Getting Started

1. Join a workspace
2. Open the code editor
3. Start collaborating in real-time!
`
    }
  ]);

  const collaborators: Collaborator[] = [
    { id: '1', name: 'Alice', avatar: 'A', cursor: { line: 5, column: 12 }, color: '#ff6b6b' },
    { id: '2', name: 'Bob', avatar: 'B', cursor: { line: 10, column: 8 }, color: '#4ecdc4' },
    { id: '3', name: 'Carol', avatar: 'C', cursor: { line: 15, column: 20 }, color: '#45b7d1' },
  ];

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Add custom themes
    monaco.editor.defineTheme('collaboration-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
      }
    });
    
    monaco.editor.setTheme('collaboration-theme');
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && activeTab < codeFiles.length) {
      const updatedFiles = [...codeFiles];
      updatedFiles[activeTab].content = value;
      setCodeFiles(updatedFiles);
    }
  };

  const runCode = () => {
    const currentFile = codeFiles[activeTab];
    if (currentFile.language === 'javascript') {
      try {
        // Simulate code execution
        setOutput('Running JavaScript...\n\nFibonacci sequence:\nF(0) = 0\nF(1) = 1\nF(2) = 1\nF(3) = 2\nF(4) = 3\nF(5) = 5\nF(6) = 8\nF(7) = 13\nF(8) = 21\nF(9) = 34\n\n✅ Code executed successfully!');
      } catch (error) {
        setOutput(`❌ Error: ${error}`);
      }
    } else {
      setOutput(`📝 ${currentFile.language.toUpperCase()} file ready for execution in ${currentFile.language} environment`);
    }
  };

  const saveFile = () => {
    console.log('Saving file:', codeFiles[activeTab].name);
    setOutput(prev => prev + '\n💾 File saved successfully!');
  };

  const addNewFile = () => {
    const newFile: CodeFile = {
      id: Date.now().toString(),
      name: 'untitled.js',
      language: 'javascript',
      content: '// New file\nconsole.log("Hello, World!");'
    };
    setCodeFiles([...codeFiles, newFile]);
    setActiveTab(codeFiles.length);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Editor Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        borderBottom: '1px solid #e2e8f0',
        bgcolor: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Code color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Collaborative Code Editor
          </Typography>
          
          {/* Collaborators */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            <People fontSize="small" color="action" />
            {collaborators.map(collaborator => (
              <Avatar
                key={collaborator.id}
                sx={{ 
                  width: 24, 
                  height: 24, 
                  fontSize: 12,
                  bgcolor: collaborator.color
                }}
              >
                {collaborator.avatar}
              </Avatar>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="css">CSS</MenuItem>
              <MenuItem value="html">HTML</MenuItem>
              <MenuItem value="markdown">Markdown</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            onClick={runCode}
            sx={{ mr: 1 }}
          >
            Run
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Save />}
            onClick={saveFile}
            sx={{ mr: 1 }}
          >
            Save
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Share />}
          >
            Share
          </Button>
        </Box>
      </Box>

      {/* File Tabs */}
      <Box sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: 'white', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {codeFiles.map((file, index) => (
              <Tab
                key={file.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {file.name}
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        const newFiles = codeFiles.filter(f => f.id !== file.id);
                        setCodeFiles(newFiles);
                        if (activeTab >= newFiles.length) {
                          setActiveTab(Math.max(0, newFiles.length - 1));
                        }
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                }
              />
            ))}
          </Tabs>
          
          <IconButton onClick={addNewFile} sx={{ ml: 1 }}>
            <Add />
          </IconButton>
        </Box>
      </Box>

      {/* Editor Area */}
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Editor
            height="100%"
            language={codeFiles[activeTab]?.language || 'javascript'}
            value={codeFiles[activeTab]?.content || ''}
            onChange={handleCodeChange}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: 'on',
              multiCursorModifier: 'ctrlCmd',
              bracketPairColorization: { enabled: true },
            }}
          />

          {/* Live Cursors Overlay */}
          {collaborators.map(collaborator => (
            <Chip
              key={collaborator.id}
              label={collaborator.name}
              size="small"
              sx={{
                position: 'absolute',
                top: 10 + collaborators.indexOf(collaborator) * 35,
                right: 10,
                bgcolor: collaborator.color,
                color: 'white',
                fontSize: 11
              }}
            />
          ))}
        </Box>

        {/* Terminal/Output Panel */}
        {showTerminal && (
          <Box sx={{ 
            width: 350, 
            borderLeft: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              bgcolor: '#1e1e1e',
              color: 'white'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Terminal fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Terminal
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                sx={{ color: 'white' }}
                onClick={() => setShowTerminal(false)}
              >
                <Close fontSize="small" />
              </IconButton>
            </Box>
            
            <Box sx={{ 
              flex: 1, 
              bgcolor: '#1e1e1e', 
              color: '#d4d4d4',
              p: 2,
              fontFamily: 'monospace',
              fontSize: 12,
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {output || 'Ready to execute code...\n\nTip: Click "Run" to execute the current file'}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CodeEditor;

// tries.js
let pyodideReadyPromise = null;
let pyodideInstance = null;
let currentProblem = null;
let currentLanguage = 'javascript';

let editor = null;

function initMonacoEditor() {
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        editor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: '',
            language: currentLanguage,
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMonacoEditor();
});

// Initialize Pyodide on first use
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

const problemData = {
    problem1: {
        title: '1. Implement Trie',
        description: 'Implement a Trie with insert, search, and startsWith methods',
        javascript: {
            starter: `class Trie {\n    constructor() {\n        // Initialize your data structure here\n    }\n    \n    insert(word) {\n        // Insert a word into the trie\n    }\n    \n    search(word) {\n        // Return true if word is in the trie\n    }\n    \n    startsWith(prefix) {\n        // Return true if any word starts with prefix\n    }\n}`,
            testCases: [
                { 
                    input: [["Trie", "insert", "search", "search", "startsWith", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]], 
                    expected: [null, null, true, false, true, null, true], 
                    desc: 'Operations: insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")' 
                },
                { 
                    input: [["Trie", "insert", "insert", "search", "search", "startsWith", "startsWith"], [[], ["hello"], ["help"], ["hello"], ["hell"], ["hel"], ["hello"]]], 
                    expected: [null, null, null, true, false, true, true], 
                    desc: 'Operations: insert("hello"), insert("help"), search("hello"), search("hell"), startsWith("hel"), startsWith("hello")' 
                },
            ]
        },
        python: {
            starter: `class Trie:\n    def __init__(self):\n        # Initialize your data structure here\n        pass\n    \n    def insert(self, word):\n        # Insert a word into the trie\n        pass\n    \n    def search(self, word):\n        # Return True if word is in the trie\n        pass\n    \n    def starts_with(self, prefix):\n        # Return True if any word starts with prefix\n        pass`,
            testCases: [
                { 
                    input: [["Trie", "insert", "search", "search", "starts_with", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]], 
                    expected: [null, null, true, false, true, null, true], 
                    desc: 'Operations: insert("apple"), search("apple"), search("app"), starts_with("app"), insert("app"), search("app")' 
                },
                { 
                    input: [["Trie", "insert", "insert", "search", "search", "starts_with", "starts_with"], [[], ["hello"], ["help"], ["hello"], ["hell"], ["hel"], ["hello"]]], 
                    expected: [null, null, null, true, false, true, true], 
                    desc: 'Operations: insert("hello"), insert("help"), search("hello"), search("hell"), starts_with("hel"), starts_with("hello")' 
                },
            ]
        },
        java: {
            starter: `class Trie {\n    public Trie() {\n        \n    }\n    \n    public void insert(String word) {\n        \n    }\n    \n    public boolean search(String word) {\n        return false;\n    }\n    \n    public boolean startsWith(String prefix) {\n        return false;\n    }\n}`,
            testCases: []
        },
        cpp: {
            starter: `class Trie {\npublic:\n    Trie() {\n        \n    }\n    \n    void insert(string word) {\n        \n    }\n    \n    bool search(string word) {\n        return false;\n    }\n    \n    bool startsWith(string prefix) {\n        return false;\n    }\n};`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Word Search II',
        description: 'Find all words from dictionary in a 2D board',
        javascript: {
            starter: `function findWords(board, words) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]], expected: ["eat","oath"], desc: 'board with words ["oath","pea","eat","rain"]' },
                { input: [[["a","b"],["c","d"]], ["abcb"]], expected: [], desc: 'no words found' },
                { input: [[["a","a"]], ["aaa"]], expected: [], desc: 'word "aaa" not in board' },
            ]
        },
        python: {
            starter: `def find_words(board, words):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"]], expected: ["eat","oath"], desc: 'board with words ["oath","pea","eat","rain"]' },
                { input: [[["a","b"],["c","d"]], ["abcb"]], expected: [], desc: 'no words found' },
                { input: [[["a","a"]], ["aaa"]], expected: [], desc: 'word "aaa" not in board' },
            ]
        },
        java: {
            starter: `public List<String> findWords(char[][] board, String[] words) {\n    // Write your code here\n    return new ArrayList<>();\n}`,
            testCases: []
        },
        cpp: {
            starter: `vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {\n    // Write your code here\n    return {};\n}`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Design Add and Search Words Data Structure',
        description: 'Design a data structure with wildcard search support',
        javascript: {
            starter: `class WordDictionary {\n    constructor() {\n        // Initialize your data structure here\n    }\n    \n    addWord(word) {\n        // Add a word to the dictionary\n    }\n    \n    search(word) {\n        // Search with wildcard '.' support\n    }\n}`,
            testCases: [
                { 
                    input: [["WordDictionary","addWord","addWord","addWord","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]],
                    expected: [null,null,null,null,false,true,true,true],
                    desc: 'Operations: addWord("bad"), addWord("dad"), addWord("mad"), search("pad"), search("bad"), search(".ad"), search("b..")'
                }
            ]
        },
        python: {
            starter: `class WordDictionary:\n    def __init__(self):\n        # Initialize your data structure here\n        pass\n    \n    def add_word(self, word):\n        # Add a word to the dictionary\n        pass\n    \n    def search(self, word):\n        # Search with wildcard '.' support\n        pass`,
            testCases: [
                { 
                    input: [["WordDictionary","add_word","add_word","add_word","search","search","search","search"], [[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]],
                    expected: [null,null,null,null,false,true,true,true],
                    desc: 'Operations: add_word("bad"), add_word("dad"), add_word("mad"), search("pad"), search("bad"), search(".ad"), search("b..")'
                }
            ]
        },
        java: {
            starter: `class WordDictionary {\n    public WordDictionary() {\n        \n    }\n    \n    public void addWord(String word) {\n        \n    }\n    \n    public boolean search(String word) {\n        return false;\n    }\n}`,
            testCases: []
        },
        cpp: {
            starter: `class WordDictionary {\npublic:\n    WordDictionary() {\n        \n    }\n    \n    void addWord(string word) {\n        \n    }\n    \n    bool search(string word) {\n        return false;\n    }\n};`,
            testCases: []
        }
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const problem = problemData[currentProblem][lang];
    if (editor) {
        editor.setValue(problem.starter);
        let monacoLang = 'javascript';
        if (lang === 'python') monacoLang = 'python';
        else if (lang === 'java') monacoLang = 'java';
        else if (lang === 'cpp') monacoLang = 'cpp';
        monaco.editor.setModelLanguage(editor.getModel(), monacoLang);
    }
}

function openPlayground(problemId) {
    currentProblem = problemId;
    currentLanguage = 'javascript';
    const problem = problemData[problemId];

    document.getElementById('playgroundTitle').textContent = problem.title;
    document.getElementById('playgroundDescription').textContent = problem.description;

    if (editor) {
        editor.setValue(problem.javascript.starter);
        monaco.editor.setModelLanguage(editor.getModel(), 'javascript');
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'javascript');
    });

    document.getElementById('testResults').innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #a3a3a3;"><p>Run tests to see results</p></div>';

    document.getElementById('playgroundModal').classList.add('show');
}

function resetCode() {
    const problem = problemData[currentProblem][currentLanguage];
    if (editor) editor.setValue(problem.starter);
}

function closePlayground() {
    document.getElementById('playgroundModal').classList.remove('show');
}

// Helper to compare arrays (order-independent)
function compareArrays(result, expected) {
    if (result.length !== expected.length) return false;
    const sortedResult = [...result].sort();
    const sortedExpected = [...expected].sort();
    return JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
}

async function runPythonTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Loading Python environment...</p></div>';

    try {
        const pyodide = await initPyodide();

        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

        let passedTests = 0;
        let resultsHTML = '';

        for (let i = 0; i < problem.testCases.length; i++) {
            const test = problem.testCases[i];
            try {
                let testCode;
                
                if (currentProblem === 'problem1' || currentProblem === 'problem3') {
                    const operations = test.input[0];
                    const values = test.input[1];
                    const className = currentProblem === 'problem1' ? 'Trie' : 'WordDictionary';
                    const methodMap = {
                        'Trie': 'Trie',
                        'WordDictionary': 'WordDictionary',
                        'insert': 'insert',
                        'search': 'search',
                        'startsWith': 'starts_with',
                        'addWord': 'add_word'
                    };
                    
                    testCode = `
${code}
results = []
obj = None
for i, op in enumerate(${JSON.stringify(operations)}):
    val = ${JSON.stringify(values)}[i]
    if op == "${className}":
        obj = ${className}()
        results.append(None)
    elif op == "insert":
        obj.insert(val[0])
        results.append(None)
    elif op == "search":
        results.append(obj.search(val[0]))
    elif op == "starts_with" or op == "startsWith":
        results.append(obj.starts_with(val[0]))
    elif op == "addWord" or op == "add_word":
        obj.add_word(val[0])
        results.append(None)
result = results
`;
                } else {
                    testCode = `
${code}
result = find_words(${JSON.stringify(test.input[0])}, ${JSON.stringify(test.input[1])})
`;
                }
                
                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result');
                
                if (result && typeof result === 'object' && result.toJs) {
                    result = result.toJs();
                    if (result && typeof result === 'object' && result[Symbol.iterator]) {
                        result = Array.from(result);
                    }
                }
                
                let passed;
                if (currentProblem === 'problem2') {
                    passed = compareArrays(result, test.expected);
                } else {
                    passed = JSON.stringify(result) === JSON.stringify(test.expected);
                }
                
                if (passed) passedTests++;
                
                resultsHTML += `
                    <div class="test-case ${passed ? 'passed' : 'failed'}">
                        <div class="test-case-header">
                            <span style="font-weight: 600;">Test ${i + 1}</span>
                            <span class="test-status">${passed ? '✓ Passed' : '✗ Failed'}</span>
                        </div>
                        <div class="test-case-body">
                            <div><strong>Input:</strong> ${test.desc}</div>
                            <div><strong>Expected:</strong> ${JSON.stringify(test.expected)}</div>
                            <div><strong>Got:</strong> ${JSON.stringify(result)}</div>
                        </div>
                    </div>
                `;
            } catch (err) {
                resultsHTML += `
                    <div class="test-case failed">
                        <div class="test-case-header">
                            <span style="font-weight: 600;">Test ${i + 1}</span>
                            <span class="test-status">✗ Error</span>
                        </div>
                        <div class="test-case-body">
                            <div style="color: #ef4444;">${err.message}</div>
                        </div>
                    </div>
                `;
            }
        }

        const allPassed = passedTests === problem.testCases.length;
        resultsHTML = `
            <div class="test-summary ${allPassed ? 'success' : (passedTests > 0 ? 'partial' : 'error')}">
                <div>
                    <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                    <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                </div>
            </div>
            ${resultsHTML}
        `;
        resultsDiv.innerHTML = resultsHTML;
    } catch (err) {
        resultsDiv.innerHTML = `
            <div class="test-summary error">
                <div>
                    <div style="font-size: 1.1rem; font-weight: 600;">Error</div>
                    <div style="font-size: 0.9rem;">${err.message}</div>
                </div>
            </div>
        `;
    }
}

async function runJavaScriptTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

    setTimeout(() => {
        try {
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    let result;
                    
                    if (currentProblem === 'problem1' || currentProblem === 'problem3') {
                        const operations = test.input[0];
                        const values = test.input[1];
                        
                        eval(code);
                        const results = [];
                        let obj = null;
                        
                        for (let j = 0; j < operations.length; j++) {
                            const op = operations[j];
                            const val = values[j];
                            
                            if (op === "Trie") {
                                obj = new Trie();
                                results.push(null);
                            } else if (op === "WordDictionary") {
                                obj = new WordDictionary();
                                results.push(null);
                            } else if (op === "insert") {
                                obj.insert(val[0]);
                                results.push(null);
                            } else if (op === "search") {
                                results.push(obj.search(val[0]));
                            } else if (op === "startsWith") {
                                results.push(obj.startsWith(val[0]));
                            } else if (op === "addWord") {
                                obj.addWord(val[0]);
                                results.push(null);
                            }
                        }
                        result = results;
                    } else {
                        eval(code);
                        result = findWords(test.input[0], test.input[1]);
                    }

                    let passed;
                    if (currentProblem === 'problem2') {
                        passed = compareArrays(result, test.expected);
                    } else {
                        passed = JSON.stringify(result) === JSON.stringify(test.expected);
                    }
                    
                    if (passed) passedTests++;

                    resultsHTML += `
                        <div class="test-case ${passed ? 'passed' : 'failed'}">
                            <div class="test-case-header">
                                <span style="font-weight: 600;">Test ${index + 1}</span>
                                <span class="test-status">${passed ? '✓ Passed' : '✗ Failed'}</span>
                            </div>
                            <div class="test-case-body">
                                <div><strong>Input:</strong> ${test.desc}</div>
                                <div><strong>Expected:</strong> ${JSON.stringify(test.expected)}</div>
                                <div><strong>Got:</strong> ${JSON.stringify(result)}</div>
                            </div>
                        </div>
                    `;
                } catch (err) {
                    resultsHTML += `
                        <div class="test-case failed">
                            <div class="test-case-header">
                                <span style="font-weight: 600;">Test ${index + 1}</span>
                                <span class="test-status">✗ Error</span>
                            </div>
                            <div class="test-case-body">
                                <div style="color: #ef4444;">${err.message}</div>
                            </div>
                        </div>
                    `;
                }
            });

            const allPassed = passedTests === problem.testCases.length;
            resultsHTML = `
                <div class="test-summary ${allPassed ? 'success' : (passedTests > 0 ? 'partial' : 'error')}">
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                        <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                    </div>
                </div>
                ${resultsHTML}
            `;
            resultsDiv.innerHTML = resultsHTML;
        } catch (err) {
            resultsDiv.innerHTML = `
                <div class="test-summary error">
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 600;">Syntax Error</div>
                        <div style="font-size: 0.9rem;">${err.message}</div>
                    </div>
                </div>
            `;
        }
    }, 500);
}

async function runTests() {
    if (currentLanguage === 'java' || currentLanguage === 'cpp') {
        alert('Test execution for ' + currentLanguage.toUpperCase() + ' coming soon!');
        return;
    }

    const runBtn = document.getElementById('runBtn');
    runBtn.disabled = true;
    runBtn.innerHTML = '⏳ Running...';

    try {
        if (currentLanguage === 'python') {
            await runPythonTests();
        } else {
            await runJavaScriptTests();
        }
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '▶ Run Tests';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePlayground();
});
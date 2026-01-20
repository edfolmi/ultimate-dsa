// trees.js
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

// Convert JS nulls to Python None
function convertNullsToNone(arr) {
    return JSON.stringify(arr).replace(/null/g, "None");
}

// Initialize Pyodide on first use
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

// TreeNode2 class for JavaScript
class TreeNode2 {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Build tree from array (level-order, null for missing nodes)
function buildTree(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) return null;
    
    const root = new TreeNode2(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length > 0 && i < arr.length) {
        const node = queue.shift();
        
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode2(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode2(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// Find node by value
function findNode(root, val) {
    if (!root) return null;
    if (root.val === val) return root;
    return findNode(root.left, val) || findNode(root.right, val);
}

const problemData = {
    problem1: {
        title: '1. Maximum Depth of Binary Tree',
        description: 'Find the maximum depth (height) of a binary tree',
        javascript: {
            starter: `function maxDepth(root) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[3,9,20,null,null,15,7]], expected: 3, desc: 'tree = [3,9,20,null,null,15,7]' },
                { input: [[1,null,2]], expected: 2, desc: 'tree = [1,null,2]' },
                { input: [[]], expected: 0, desc: 'tree = []' },
                { input: [[1]], expected: 1, desc: 'tree = [1]' },
            ]
        },
        python: {
            starter: `def max_depth(root):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[3,9,20,null,null,15,7]], expected: 3, desc: 'tree = [3,9,20,null,null,15,7]' },
                { input: [[1,null,2]], expected: 2, desc: 'tree = [1,null,2]' },
                { input: [[]], expected: 0, desc: 'tree = []' },
                { input: [[1]], expected: 1, desc: 'tree = [1]' },
            ]
        },
        java: {
            starter: `public int maxDepth(TreeNode root) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int maxDepth(TreeNode* root) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Validate Binary Search Tree',
        description: 'Determine if a binary tree is a valid BST',
        javascript: {
            starter: `function isValidBST(root) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[2,1,3]], expected: true, desc: 'tree = [2,1,3]' },
                { input: [[5,1,4,null,null,3,6]], expected: false, desc: 'tree = [5,1,4,null,null,3,6]' },
                { input: [[1]], expected: true, desc: 'tree = [1]' },
                { input: [[5,4,6,null,null,3,7]], expected: false, desc: 'tree = [5,4,6,null,null,3,7]' },
            ]
        },
        python: {
            starter: `def is_valid_bst(root):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[2,1,3]], expected: true, desc: 'tree = [2,1,3]' },
                { input: [[5,1,4,null,null,3,6]], expected: false, desc: 'tree = [5,1,4,null,null,3,6]' },
                { input: [[1]], expected: true, desc: 'tree = [1]' },
                { input: [[5,4,6,null,null,3,7]], expected: false, desc: 'tree = [5,4,6,null,null,3,7]' },
            ]
        },
        java: {
            starter: `public boolean isValidBST(TreeNode root) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        },
        cpp: {
            starter: `bool isValidBST(TreeNode* root) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Lowest Common Ancestor',
        description: 'Find the lowest common ancestor in a BST',
        javascript: {
            starter: `function lowestCommonAncestor(root, p, q) {\n    // Write your code here\n    // Return the node value\n}`,
            testCases: [
                { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6, desc: 'root=[6,2,8,0,4,7,9,null,null,3,5], p=2, q=8' },
                { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2, desc: 'root=[6,2,8,0,4,7,9,null,null,3,5], p=2, q=4' },
                { input: [[2,1], 2, 1], expected: 2, desc: 'root=[2,1], p=2, q=1' },
            ]
        },
        python: {
            starter: `def lowest_common_ancestor(root, p, q):\n    # Write your code here\n    # Return the node value\n    pass`,
            testCases: [
                { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 8], expected: 6, desc: 'root=[6,2,8,0,4,7,9,null,null,3,5], p=2, q=8' },
                { input: [[6,2,8,0,4,7,9,null,null,3,5], 2, 4], expected: 2, desc: 'root=[6,2,8,0,4,7,9,null,null,3,5], p=2, q=4' },
                { input: [[2,1], 2, 1], expected: 2, desc: 'root=[2,1], p=2, q=1' },
            ]
        },
        java: {
            starter: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    // Write your code here\n    return null;\n}`,
            testCases: []
        },
        cpp: {
            starter: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    // Write your code here\n    return nullptr;\n}`,
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

async function runPythonTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Loading Python environment...</p></div>';

    try {
        const pyodide = await initPyodide();

        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

        // Define TreeNode class in Python
        await pyodide.runPythonAsync(`
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def find_node(root, val):
    if not root:
        return None
    if root.val == val:
        return root
    return find_node(root.left, val) or find_node(root.right, val)
`);

        let passedTests = 0;
        let resultsHTML = '';

        for (let i = 0; i < problem.testCases.length; i++) {
            const test = problem.testCases[i];
            try {
                let testCode;
                const funcName = currentProblem === 'problem1' ? 'max_depth' : 
                                currentProblem === 'problem2' ? 'is_valid_bst' : 'lowest_common_ancestor';
                
                if (currentProblem === 'problem3') {
                    testCode = `
${code}
root = build_tree(${convertNullsToNone(test.input[0])})
p = find_node(root, ${test.input[1]})
q = find_node(root, ${test.input[2]})
result_node = ${funcName}(root, p, q)
result = result_node.val if result_node else None
`;
} else {
    testCode = `
${code}
root = build_tree(${convertNullsToNone(test.input[0])})
result = ${funcName}(root)
`;
                }

                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result');
                
                if (result && typeof result === 'object' && result.toJs) {
                    result = result.toJs();
                }

                const passed = result === test.expected;
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
            // Evaluate user code
            eval(code);
            
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    let result;
                    
                    if (currentProblem === 'problem1') {
                        const root = buildTree(test.input[0]);
                        result = maxDepth(root);
                    } else if (currentProblem === 'problem2') {
                        const root = buildTree(test.input[0]);
                        result = isValidBST(root);
                    } else if (currentProblem === 'problem3') {
                        const root = buildTree(test.input[0]);
                        const p = findNode(root, test.input[1]);
                        const q = findNode(root, test.input[2]);
                        const resultNode = lowestCommonAncestor(root, p, q);
                        result = resultNode ? resultNode.val : null;
                    }

                    const passed = result === test.expected;
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
// linked-lists.js
let pyodideReadyPromise = null;
let pyodideInstance = null;
let currentProblem = null;
let currentLanguage = 'javascript';

function initMonacoEditor() {
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        editor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: '', // We'll set the starter code dynamically
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

// ListNode2 class for JavaScript
class ListNode2 {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper to create linked list from array
function createList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode2(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode2(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper to convert linked list to array
function listToArray(head) {
    const result = [];
    let current = head;
    const visited = new Set();
    while (current !== null) {
        if (visited.has(current)) break; // Prevent infinite loop in cycle
        visited.add(current);
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Initialize Pyodide
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

const problemData = {
    problem1: {
        title: '1. Reverse Linked List',
        description: 'Reverse the linked list and return the reversed list',
        javascript: {
            starter: `function reverseList(head) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], desc: '[1,2,3,4,5]' },
                { input: [[1, 2]], expected: [2, 1], desc: '[1,2]' },
                { input: [[]], expected: [], desc: '[]' },
                { input: [[1]], expected: [1], desc: '[1]' },
            ]
        },
        python: {
            starter: `def reverse_list(head):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1], desc: '[1,2,3,4,5]' },
                { input: [[1, 2]], expected: [2, 1], desc: '[1,2]' },
                { input: [[]], expected: [], desc: '[]' },
                { input: [[1]], expected: [1], desc: '[1]' },
            ]
        },
        java: {
            starter: `public ListNode2 reverseList(ListNode2 head) {\n    // Write your code here\n    return null;\n}`,
            testCases: []
        },
        cpp: {
            starter: `ListNode2* reverseList(ListNode2* head) {\n    // Write your code here\n    return nullptr;\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Linked List Cycle',
        description: 'Determine if the linked list has a cycle',
        javascript: {
            starter: `function hasCycle(head) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[3, 2, 0, -4], 1], expected: true, desc: '[3,2,0,-4] with cycle at pos 1' },
                { input: [[1, 2], 0], expected: true, desc: '[1,2] with cycle at pos 0' },
                { input: [[1], -1], expected: false, desc: '[1] with no cycle' },
                { input: [[], -1], expected: false, desc: '[] empty list' },
            ]
        },
        python: {
            starter: `def has_cycle(head):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[3, 2, 0, -4], 1], expected: true, desc: '[3,2,0,-4] with cycle at pos 1' },
                { input: [[1, 2], 0], expected: true, desc: '[1,2] with cycle at pos 0' },
                { input: [[1], -1], expected: false, desc: '[1] with no cycle' },
                { input: [[], -1], expected: false, desc: '[] empty list' },
            ]
        },
        java: {
            starter: `public boolean hasCycle(ListNode2 head) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        },
        cpp: {
            starter: `bool hasCycle(ListNode2 *head) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Merge Two Sorted Lists',
        description: 'Merge two sorted linked lists',
        javascript: {
            starter: `function mergeTwoLists(list1, list2) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], desc: '[1,2,4] and [1,3,4]' },
                { input: [[], []], expected: [], desc: '[] and []' },
                { input: [[], [0]], expected: [0], desc: '[] and [0]' },
                { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], desc: '[1,3,5] and [2,4,6]' },
            ]
        },
        python: {
            starter: `def merge_two_lists(list1, list2):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4], desc: '[1,2,4] and [1,3,4]' },
                { input: [[], []], expected: [], desc: '[] and []' },
                { input: [[], [0]], expected: [0], desc: '[] and [0]' },
                { input: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6], desc: '[1,3,5] and [2,4,6]' },
            ]
        },
        java: {
            starter: `public ListNode2 mergeTwoLists(ListNode2 list1, ListNode2 list2) {\n    // Write your code here\n    return null;\n}`,
            testCases: []
        },
        cpp: {
            starter: `ListNode2* mergeTwoLists(ListNode2* list1, ListNode2* list2) {\n    // Write your code here\n    return nullptr;\n}`,
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


// Helper to create cycle in list
function createCycleList(arr, pos) {
    if (!arr || arr.length === 0) return null;
    const head = createList(arr);
    if (pos === -1) return head;

    let cycleNode = head;
    let tail = head;
    let index = 0;

    while (tail.next !== null) {
        if (index === pos) cycleNode = tail;
        tail = tail.next;
        index++;
    }
    if (index === pos) cycleNode = tail;

    tail.next = cycleNode;
    return head;
}

async function runPythonTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Loading Python environment...</p></div>';

    // Scroll to top of results
    resultsDiv.scrollTop = 0;

    try {
        const pyodide = await initPyodide();

        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

        // Define ListNode2 class in Python
        await pyodide.runPythonAsync(`
class ListNode2:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def create_list(arr):
    if not arr:
        return None
    head = ListNode2(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode2(val)
        current = current.next
    return head

def list_to_array(head):
    result = []
    current = head
    visited = set()
    while current:
        if id(current) in visited:
            break
        visited.add(id(current))
        result.append(current.val)
        current = current.next
    return result

def create_cycle_list(arr, pos):
    if not arr:
        return None
    head = create_list(arr)
    if pos == -1:
        return head
    cycle_node = head
    tail = head
    index = 0
    while tail.next:
        if index == pos:
            cycle_node = tail
        tail = tail.next
        index += 1
    if index == pos:
        cycle_node = tail
    tail.next = cycle_node
    return head
`);

        let passedTests = 0;
        let resultsHTML = '';

        for (let i = 0; i < problem.testCases.length; i++) {
            const test = problem.testCases[i];
            try {
                let testCode;
                let funcName = currentProblem === 'problem1' ? 'reverse_list' :
                    currentProblem === 'problem2' ? 'has_cycle' : 'merge_two_lists';

                if (currentProblem === 'problem2') {
                    testCode = `
${code}
head = create_cycle_list(${JSON.stringify(test.input[0])}, ${test.input[1]})
result = ${funcName}(head)
`;
                } else if (currentProblem === 'problem3') {
                    testCode = `
${code}
list1 = create_list(${JSON.stringify(test.input[0])})
list2 = create_list(${JSON.stringify(test.input[1])})
result_head = ${funcName}(list1, list2)
result = list_to_array(result_head)
`;
                } else {
                    testCode = `
${code}
head = create_list(${JSON.stringify(test.input[0])})
result_head = ${funcName}(head)
result = list_to_array(result_head)
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

                const passed = JSON.stringify(result) === JSON.stringify(test.expected);
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

        // Smooth scroll to top to show summary
        setTimeout(() => {
            resultsDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

    } catch (err) {
        resultsDiv.innerHTML = `
                    <div class="test-summary error">
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600;">Error</div>
                            <div style="font-size: 0.9rem;">${err.message}</div>
                        </div>
                    </div>
                `;
        resultsDiv.scrollTop = 0;
    }
}

async function runJavaScriptTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

    // Scroll to top
    resultsDiv.scrollTop = 0;

    setTimeout(() => {
        try {
            const userFunction = new Function('ListNode2', 'createList', 'listToArray', 'createCycleList', 'return ' + code)(ListNode2, createList, listToArray, createCycleList);
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    let result;

                    if (currentProblem === 'problem2') {
                        // Cycle detection
                        const head = createCycleList(test.input[0], test.input[1]);
                        result = userFunction(head);
                    } else if (currentProblem === 'problem3') {
                        // Merge two lists
                        const list1 = createList(test.input[0]);
                        const list2 = createList(test.input[1]);
                        const mergedHead = userFunction(list1, list2);
                        result = listToArray(mergedHead);
                    } else {
                        // Reverse list
                        const head = createList(test.input[0]);
                        const reversedHead = userFunction(head);
                        result = listToArray(reversedHead);
                    }

                    const passed = JSON.stringify(result) === JSON.stringify(test.expected);
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

            // Smooth scroll to top after rendering with slight delay
            setTimeout(() => {
                resultsDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);

        } catch (err) {
            resultsDiv.innerHTML = `
                        <div class="test-summary error">
                            <div>
                                <div style="font-size: 1.1rem; font-weight: 600;">Syntax Error</div>
                                <div style="font-size: 0.9rem;">${err.message}</div>
                            </div>
                        </div>
                    `;
            resultsDiv.scrollTop = 0;
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

// Close modal when clicking outside
document.getElementById('playgroundModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'playgroundModal') closePlayground();
});
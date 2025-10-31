// =========================================================================
// CONSTANTS & CONFIGURATION (Outside DOMContentLoaded)
// =========================================================================
const GRID_SIZE = 20;

const nodeTypes = {
    communication: [
        {
            type: 'milestone',
            name: 'Milestone',
            icon: `<i class="fas fa-flag text-blue-400 text-xl"></i>`,
            category: 'communication',
            properties: {
                goal: { type: 'textarea', label: 'Goal', value: 'Achieve project milestone' },
                description: { type: 'textarea', label: 'Description', value: 'Milestone description' },
                advancedSettings: { type: 'textarea', label: 'Advanced Settings', value: 'Additional configuration' }
            }
        },
        {
            type: 'conversation',
            name: 'Conversation',
            icon: `<i class="fas fa-comments text-blue-400 text-xl"></i>`,
            category: 'communication',
            properties: {
                purpose: { type: 'textarea', label: 'Purpose', value: 'The main purpose of this node...' },
                context: { type: 'textarea', label: 'Context', value: 'Context depends on...' },
                dataExtraction: { type: 'textarea', label: 'Data Extraction', value: '' },
                dataOutput: { type: 'text', label: 'Data Output', value: '' },
                advancedSettings: { type: 'textarea', label: 'Advanced Settings', value: '' }
            }
        },
    ],
    control: [
        {
            type: 'trigger',
            name: 'Trigger',
            icon: `<i class="fas fa-bolt text-orange-400 text-xl"></i>`,
            category: 'control',
            properties: {
                triggerPhrase: { type: 'text', label: 'Trigger Phrase', value: '' },
                description: { type: 'textarea', label: 'Description', value: '' }
            }
        },
        {
            type: 'path_conditions',
            name: 'Path Conditions',
            icon: `<i class="fas fa-code-branch text-pink-400 text-xl"></i>`,
            category: 'control',
            properties: {
                description: { type: 'textarea', label: 'Description', value: 'Decide conditions when to move to next stage' },
                conditions: { type: 'textarea', label: 'Conditions', value: 'Define path conditions here...' }
            }
        },
        {
            type: 'stop',
            name: 'Stop',
            icon: `<i class="fas fa-stop-circle text-orange-400 text-xl"></i>`,
            category: 'control',
            properties: {
                label: { type: 'static', value: 'Stop Process' }
            }
        },
        {
            type: 'wait',
            name: 'Wait',
            icon: `<i class="fas fa-hourglass-half text-orange-400 text-xl"></i>`,
            category: 'control',
            properties: {
                duration: { type: 'number', label: 'Duration', value: 5 },
                unit: {
                    type: 'select',
                    label: 'Unit',
                    options: ['Seconds', 'Minutes', 'Hours'],
                    value: 'Minutes'
                }
            }
        },
        {
            type: 'respond',
            name: 'Respond',
            icon: `<i class="fas fa-reply text-orange-400 text-xl"></i>`,
            category: 'control',
            properties: {
                responseType: {
                    type: 'select',
                    label: 'Response Type',
                    value: 'email',
                    options: ['email', 'call', 'sms', 'message']
                },
                template: { type: 'textarea', label: 'Template', value: 'Response template' },
                delay: { type: 'text', label: 'Delay', value: '0 seconds' },
                description: { type: 'textarea', label: 'Description', value: 'Response settings' }
            }
        }
    ],
    ai: [
        {
            type: 'ai_response',
            name: 'AI Response',
            icon: `<i class="fas fa-robot text-purple-400 text-xl"></i>`,
            category: 'ai',
            properties: {
                toolSelection: {
                    type: 'select',
                    label: 'AI Model',
                    value: 'gpt-4',
                    options: ['gpt-4', 'gpt-3.5', 'claude-2', 'dall-e']
                },
                input: { type: 'textarea', label: 'Input', value: 'User input data' },
                output: { type: 'text', label: 'Output', value: 'processed_data' },
                description: { type: 'textarea', label: 'Description', value: 'AI tool configuration' }
            }
        },
        {
            type: 'ai_analysis',
            name: 'AI Analysis',
            icon: `<i class="fas fa-chart-line text-purple-400 text-xl"></i>`,
            category: 'ai',
            properties: {
                analysisType: {
                    type: 'select',
                    label: 'Analysis Type',
                    value: 'sentiment',
                    options: ['sentiment', 'classification', 'summarization', 'extraction']
                },
                input: { type: 'textarea', label: 'Input Data', value: 'Text to analyze' },
                parameters: { type: 'textarea', label: 'Parameters', value: 'Analysis settings' },
                description: { type: 'textarea', label: 'Description', value: 'AI analysis configuration' }
            }
        },
        {
            type: 'booking',
            name: 'Booking',
            icon: `<i class="fas fa-calendar-check text-purple-400 text-xl"></i>`,
            category: 'ai',
            properties: {
                userCalendar: {
                    type: 'select',
                    label: 'User Calendar',
                    value: 'User1',
                    options: ['User1', 'User2', 'User3', 'Shared Calendar']
                },
                setTimezone: { type: 'boolean', label: 'Set Timezone', value: false },
                saveTimezone: { type: 'boolean', label: 'Save Contact Timezone', value: true },
            }
        },
        {
            "type": "edit_tags",
            "name": "Edit Tags",
            "icon": "<i class='fas fa-tags text-green-500 text-xl'></i>",
            "category": "ai",
            "properties": {
                "action": {
                    "type": "select",
                    "label": "Action",
                    "value": "Remove Tags",
                    "options": [
                        "Add Tags",
                        "Remove Tags"
                    ]
                },
                "tags_to_add": {
                    "type": "tags-input",
                    "label": "Add Tags:",
                    "placeholder": "Select tags to add...",
                    "value": [],
                    "displayCondition": {
                        "property": "action",
                        "value": "Add Tags"
                    }
                },
                "tags_to_remove": {
                    "type": "tags-input",
                    "label": "Remove Tags:",
                    "placeholder": "Select tags to remove...",
                    "value": [],
                    "displayCondition": {
                        "property": "action",
                        "value": "Remove Tags"
                    }
                }
            }
        }
    ]
};

const channelConfig = {
    whatsapp: { name: 'WhatsApp', color: '#25D366', icon: 'fab fa-whatsapp' },
    instagram: { name: 'Instagram', color: '#E4405F', icon: 'fab fa-instagram' },
    facebook: { name: 'Facebook', color: '#1877F2', icon: 'fab fa-facebook' },
    telegram: { name: 'Telegram', color: '#0088CC', icon: 'fab fa-telegram' },
    email: { name: 'Email', color: '#EA4335', icon: 'fas fa-envelope' },
    sms: { name: 'SMS', color: '#34B7F1', icon: 'fas fa-comment-alt' },
    call: { name: 'Call', color: '#10B981', icon: 'fas fa-phone' }
};

const defaultState = {
    nodes: [
        {
            id: 1,
            x: 100,
            y: 150,
            type: 'start',
            category: 'start',
            title: 'Start',
            description: 'Workflow starting point',
            channel: 'all'
        }
    ],
    connections: [],
};

// =========================================================================
// PURE UTILITY FUNCTIONS (Outside DOMContentLoaded)
// =========================================================================
function screenToCanvasCoords(x, y, pan, scale) {
    return { x: (x - pan.x) / scale, y: (y - pan.y) / scale };
}

function snapToGrid(val) {
    return Math.round(val / GRID_SIZE) * GRID_SIZE;
}

function getChannelOptions(currentChannel) {
    let options = '<option value="">Select Channel</option>';
    for (const [key, config] of Object.entries(channelConfig)) {
        options += `<option value="${key}" ${currentChannel === key ? 'selected' : ''}>${config.name}</option>`;
    }
    return options;
}

function getNodeContent(node, nodeTypes) {
    const nodeDef = Object.values(nodeTypes).flat().find(n => n.type === node.type);
    const icon = nodeDef?.icon || `<i class="fas fa-cube text-gray-400 text-xl"></i>`;

    if (node.type === 'start') {
        return `
            <div class="flex flex-col items-center justify-center h-full p-3">
                <div class="flex items-center space-x-2 mb-2">
                    <i class="fas fa-play-circle text-green-400 text-2xl"></i>
                    <div class="text-center">
                        <h3 class="font-bold text-sm">${node.title}</h3>
                        <p class="text-xs text-gray-400">Workflow Start</p>
                    </div>
                </div>
                <div class="text-xs text-gray-400 text-center mt-1">
                    Entry Point
                </div>
                <div class="compact-node-connectors">
                    <div class="compact-node-connector out" data-connector="out"></div>
                </div>
            </div>
        `;
    }

    let content = `
        <div class="compact-node-header">
            ${icon}
            <div class="compact-node-title" contenteditable="true" data-field="title" data-node-id="${node.id}">${node.title}</div>
        </div>
        <select class="compact-node-channel channel-selector" data-node-id="${node.id}">
            ${getChannelOptions(node.channel)}
        </select>
        <div class="compact-node-connectors">
            <div class="compact-node-connector in" data-connector="in"></div>
            <div class="compact-node-connector out" data-connector="out"></div>
        </div>
    `;

    if (node.type !== 'start') {
        content += `
            <button data-delete-id="${node.id}" class="delete-node-button absolute -top-2 -right-2 w-6 h-6 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-content-center text-white text-sm transition-all" title="Delete Node">&times;</button>
        `;
    }

    return content;
}

function ensureSingleStartNode(state, nextId) {
    const startNodes = state.nodes.filter(n => n.type === 'start');
    if (startNodes.length === 0) {
        state.nodes.push({
            id: nextId,
            x: 100,
            y: 150,
            type: 'start',
            category: 'start',
            title: 'Start',
            description: 'Workflow starting point',
            channel: 'all'
        });
        return nextId + 1;
    } else if (startNodes.length > 1) {
        const firstStartId = startNodes[0].id;
        state.nodes = state.nodes.filter(n => n.type !== 'start' || n.id === firstStartId);
    }
    return nextId;
}

function createNode(state, nextId, type, x, y, nodeTypes) {
    const nodeDef = Object.values(nodeTypes).flat().find(n => n.type === type);
    const newNode = {
        id: nextId,
        x,
        y,
        type,
        category: nodeDef?.category || 'communication',
        title: nodeDef?.name || `New ${type}`,
        channel: 'whatsapp'
    };

    if (nodeDef?.properties) {
        Object.keys(nodeDef.properties).forEach(key => {
            newNode[key] = nodeDef.properties[key].value;
        });
    }

    state.nodes.push(newNode);
    return { newNode, newNextId: nextId + 1 };
}

function duplicateSelectedNodes(state, selectedNodeIds, nextId) {
    if (selectedNodeIds.size === 0) return { newNodes: [], newNextId: nextId };
    
    const newNodes = [];
    const idMap = new Map();

    selectedNodeIds.forEach(id => {
        const oldNode = state.nodes.find(n => n.id === id);
        if (oldNode.type === 'start') return;

        const newNode = JSON.parse(JSON.stringify(oldNode));
        newNode.id = nextId++;
        newNode.x += GRID_SIZE * 2;
        newNode.y += GRID_SIZE * 2;
        newNodes.push(newNode);
        idMap.set(id, newNode.id);
    });

    return { newNodes, newNextId: nextId };
}

function copySelectedNodes(state, selectedNodeIds) {
    return state.nodes.filter(n => selectedNodeIds.has(n.id) && n.type !== 'start')
        .map(n => JSON.parse(JSON.stringify(n)));
}

function pasteNodes(state, clipboard, nextId, x, y) {
    if (clipboard.length === 0) return { newNodes: [], newNextId: nextId };
    
    const newNodes = [];
    const idMap = new Map();
    const firstNode = clipboard[0];
    const offsetX = x - firstNode.x;
    const offsetY = y - firstNode.y;

    clipboard.forEach(node => {
        if (node.type === 'start') return;
        const newNode = JSON.parse(JSON.stringify(node));
        newNode.id = nextId++;
        newNode.x += offsetX;
        newNode.y += offsetY;
        newNodes.push(newNode);
        idMap.set(node.id, newNode.id);
    });

    return { newNodes, newNextId: nextId };
}

function deleteNodes(state, nodesToDelete) {
    nodesToDelete.forEach(id => {
        const nodeIndex = state.nodes.findIndex(n => n.id === id);
        if (nodeIndex > -1) {
            state.nodes.splice(nodeIndex, 1);
            state.connections = state.connections.filter(c => c.from !== id && c.to !== id);
        }
    });
}

// =========================================================================
// DOMCONTENTLOADED - Only DOM-dependent code
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // #region --- ELEMENT SELECTORS ---
    const canvasContainer = document.getElementById('canvas-container');
    const transformContainer = document.getElementById('transform-container');
    const nodeContainer = document.getElementById('node-container');
    const svgCanvas = document.getElementById('svg-canvas');
    const selectionBox = document.getElementById('selection-box');
    const contextMenu = document.getElementById('context-menu');
    const minimap = document.getElementById('minimap');
    const minimapNodes = document.getElementById('minimap-nodes');
    const minimapViewport = document.getElementById('minimap-viewport');
    const undoButton = document.getElementById('undo-button');
    const redoButton = document.getElementById('redo-button');
    const zoomInButton = document.getElementById('zoom-in-button');
    const zoomOutButton = document.getElementById('zoom-out-button');
    const channelBar = document.getElementById('channel-bar');
    const toggleChannels = document.getElementById('toggle-channels');
    const nodePanel = document.getElementById('node-panel');
    const togglePanel = document.getElementById('toggle-panel');
    const deleteModal = document.getElementById('delete-modal');
    const deleteModalTitle = document.getElementById('delete-modal-title');
    const deleteModalBody = document.getElementById('delete-modal-body');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');
    const settingsPanel = document.getElementById('settings-panel');
    const closeSettings = document.getElementById('close-settings');
    const settingsContent = document.getElementById('settings-content');
    const noNodeSelected = document.getElementById('no-node-selected');
    const nodeSettings = document.getElementById('node-settings');
    const pathConditionModal = document.getElementById('path-condition-modal');
    const saveConditionButton = document.getElementById('save-condition');
    const cancelConditionButton = document.getElementById('cancel-condition');
    const conditionTypeSelect = document.getElementById('condition-type');
    const dataConditionSection = document.getElementById('data-condition-section');
    const dataOperatorSection = document.getElementById('data-operator-section');
    const dataValueSection = document.getElementById('data-value-section');
    const channelConditionSection = document.getElementById('channel-condition-section');
    const customConditionSection = document.getElementById('custom-condition-section');
    const dataFieldInput = document.getElementById('data-field');
    const dataOperatorSelect = document.getElementById('data-operator');
    const dataValueInput = document.getElementById('data-value');
    const channelValueSelect = document.getElementById('channel-value');
    const customConditionTextarea = document.getElementById('custom-condition');
    // #endregion

    // #region --- INCREASE CANVAS SIZE ---
    canvasContainer.style.width = '3000px';
    canvasContainer.style.height = '3000px';
    transformContainer.style.width = '3000px';
    transformContainer.style.height = '3000px';
    svgCanvas.style.width = '3000px';
    svgCanvas.style.height = '3000px';
    // #endregion

    // #region --- STATE MANAGEMENT ---
    let state = { nodes: [], connections: [] };
    let nextId = 1;
    let history = [];
    let historyIndex = -1;
    let clipboard = [];
    let activeChannel = 'all';
    let nodesToDelete = [];
    let editingConnectionIndex = null;
    let connectionStartConnector = null;
    let selectedNodeIds = new Set();
    let isDraggingNode = false, isDrawingConnection = false, isPanning = false, isSelecting = false;
    let connectionStartNodeId = null;
    let tempLine = null;
    let dragOffset = { x: 0, y: 0 };
    let pan = { x: 0, y: 0 };
    let scale = 1;
    let selectionStart = { x: 0, y: 0 };
    let contextMenuCoords = { x: 0, y: 0 };
    let currentTheme = localStorage.getItem('theme') || 'dark';
    // #endregion

    // #region --- DOM-SPECIFIC FUNCTIONS ---
    function toggleTheme() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);

        const themeIcon = document.querySelector('#theme-toggle i');
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.title = 'Switch to Dark Mode';
        }

        render();
    }

    function applyTransform() {
        transformContainer.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
        renderMinimap();
    }

    function render() {
        nodeContainer.innerHTML = '';
        state.nodes.forEach(node => {
            const nodeEl = document.createElement('div');
            nodeEl.id = `node-${node.id}`;
            nodeEl.className = `node compact-node node-${node.category}`;
            nodeEl.style.left = `${node.x}px`;
            nodeEl.style.top = `${node.y}px`;
            if (selectedNodeIds.has(node.id)) nodeEl.classList.add('selected');
            nodeEl.innerHTML = getNodeContent(node, nodeTypes);
            nodeContainer.appendChild(nodeEl);
        });
        renderConnections();
        attachListeners();
        updateUndoRedoButtons();
        renderMinimap();
    }

    function renderConnections() {
        const svgGroups = state.connections.map((conn, index) => {
            const fromNode = state.nodes.find(n => n.id === conn.from);
            const toNode = state.nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return '';

            const fromEl = document.getElementById(`node-${fromNode.id}`);
            const toEl = document.getElementById(`node-${toNode.id}`);
            if (!fromEl || !toEl) return '';

            const fromWidth = fromEl.offsetWidth;
            const fromHeight = fromEl.offsetHeight;
            const toWidth = toEl.offsetWidth;
            const toHeight = toEl.offsetHeight;

            const p1 = { x: fromNode.x + fromWidth, y: fromNode.y + fromHeight / 2 };
            const p2 = { x: toNode.x, y: toNode.y + toHeight / 2 };

            if (isNaN(p1.x) || isNaN(p1.y) || isNaN(p2.x) || isNaN(p2.y)) return '';

            const offset = Math.max(50, Math.abs(p2.x - p1.x) * 0.5);
            const d = `M ${p1.x} ${p1.y} C ${p1.x + offset} ${p1.y}, ${p2.x - offset} ${p2.y}, ${p2.x} ${p2.y}`;

            const t = 0.5;
            const midX = Math.pow(1 - t, 3) * p1.x + 3 * Math.pow(1 - t, 2) * t * (p1.x + offset) + 3 * (1 - t) * t * t * (p2.x - offset) + Math.pow(t, 3) * p2.x;
            const midY = Math.pow(1 - t, 3) * p1.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * t * t * p2.y + Math.pow(t, 3) * p2.y;

            const hasCondition = conn.condition && Object.keys(conn.condition).length > 0;
            const conditionIcon = hasCondition ? 'fa-file-alt' : 'fa-code-branch';
            const conditionClass = hasCondition ? 'has-condition' : '';

            return `
                <g class="connection-group" data-conn-index="${index}">
                    <path d="${d}" class="connection-line" />
                    <path d="${d}" class="connection-hitbox" />
                    <foreignObject x="${midX - 40}" y="${midY - 18}" width="80" height="36">
                        <div class="connection-controls">
                            <button data-conn-index="${index}" class="connection-edge-btn condition-btn ${conditionClass}" title="Set Path Condition">
                                <i class="fas ${conditionIcon}"></i>
                            </button>
                            <button data-conn-index="${index}" class="connection-edge-btn delete-btn" title="Delete Connection">
                                &times;
                            </button>
                        </div>
                    </foreignObject>
                </g>
            `;
        }).join('');

        svgCanvas.innerHTML = svgGroups;

        if (tempLine) {
            svgCanvas.appendChild(tempLine);
        }
    }

    function renderMinimap() {
        if (state.nodes.length === 0) {
            minimapNodes.innerHTML = '';
            minimapViewport.style.display = 'none';
            return;
        }
        minimapViewport.style.display = 'block';

        const bounds = state.nodes.reduce((b, n) => ({
            minX: Math.min(b.minX, n.x),
            minY: Math.min(b.minY, n.y),
            maxX: Math.max(b.maxX, n.x + 200),
            maxY: Math.max(b.maxY, n.y + 100),
        }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

        const contentWidth = bounds.maxX - bounds.minX;
        const contentHeight = bounds.maxY - bounds.minY;
        const mapScaleX = minimap.clientWidth / contentWidth;
        const mapScaleY = minimap.clientHeight / contentHeight;
        const mapScale = Math.min(mapScaleX, mapScaleY);

        minimapNodes.innerHTML = state.nodes.map(node => {
            const x = (node.x - bounds.minX) * mapScale;
            const y = (node.y - bounds.minY) * mapScale;
            return `<div class="minimap-node ${selectedNodeIds.has(node.id) ? 'selected' : ''}" style="left: ${x}px; top: ${y}px; width: ${200 * mapScale}px; height: ${100 * mapScale}px;"></div>`;
        }).join('');

        const viewRect = canvasContainer.getBoundingClientRect();
        const viewLeft = (-pan.x / scale - bounds.minX) * mapScale;
        const viewTop = (-pan.y / scale - bounds.minY) * mapScale;
        const viewWidth = (viewRect.width / scale) * mapScale;
        const viewHeight = (viewRect.height / scale) * mapScale;

        minimapViewport.style.left = `${viewLeft}px`;
        minimapViewport.style.top = `${viewTop}px`;
        minimapViewport.style.width = `${viewWidth}px`;
        minimapViewport.style.height = `${viewHeight}px`;
    }

    function updateUndoRedoButtons() {
        undoButton.disabled = historyIndex <= 0;
        redoButton.disabled = historyIndex >= history.length - 1;
    }

    function saveState(skipSave = false) {
        nextId = ensureSingleStartNode(state, nextId);
        history = history.slice(0, historyIndex + 1);
        history.push(JSON.parse(JSON.stringify(state)));
        historyIndex++;
        updateUndoRedoButtons();
        if (!skipSave) {
            localStorage.setItem('aiWorkflowState', JSON.stringify(state));
        }
    }

    function loadState() {
        const savedState = localStorage.getItem('aiWorkflowState');
        state = savedState ? JSON.parse(savedState) : JSON.parse(JSON.stringify(defaultState));
        nextId = ensureSingleStartNode(state, nextId);
        saveState(true);
    }

    function showDeleteModal(ids) {
        if (!Array.isArray(ids)) ids = [ids];

        nodesToDelete = ids.filter(id => {
            const node = state.nodes.find(n => n.id === id);
            return node && node.type !== 'start';
        });

        if (nodesToDelete.length === 0) {
            if (ids.some(id => {
                const node = state.nodes.find(n => n.id === id);
                return node && node.type === 'start';
            })) {
                deleteModalTitle.textContent = 'Cannot Delete Start Node';
                deleteModalBody.textContent = 'The start node cannot be deleted as it is the entry point of your workflow.';
                confirmDelete.disabled = true;
                deleteModal.style.display = 'flex';
                return;
            }
            return;
        }

        if (nodesToDelete.length > 1) {
            deleteModalTitle.textContent = `Delete ${nodesToDelete.length} Nodes`;
            deleteModalBody.textContent = `Are you sure you want to delete these ${nodesToDelete.length} nodes? This action cannot be undone.`;
        } else {
            deleteModalTitle.textContent = 'Delete Node';
            deleteModalBody.textContent = 'Are you sure you want to delete this node? This action cannot be undone.';
        }
        confirmDelete.disabled = false;
        deleteModal.style.display = 'flex';
    }

    function hideDeleteModal() {
        deleteModal.style.display = 'none';
        nodesToDelete = [];
    }

    function attachListeners() {
        document.querySelectorAll('.node').forEach(el => {
            const nodeId = parseInt(el.id.split('-')[1]);
            const node = state.nodes.find(n => n.id === nodeId);

            el.addEventListener('mousedown', e => onNodeMouseDown(e, nodeId));
            
            el.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                const node = state.nodes.find(n => n.id === nodeId);
                if (!node) return;

                document.querySelectorAll('.node.expanded').forEach(n => {
                    n.classList.remove('expanded');
                    const body = n.querySelector('.expanded-body');
                    if (body) body.remove();
                });

                const expanded = el.classList.toggle('expanded');

                if (expanded) {
                    const nodeDef = Object.values(nodeTypes).flat().find(n => n.type === node.type);
                    if (!nodeDef || !nodeDef.properties) return;

                    let html = `<div class="expanded-body mt-2">`;

                    for (const [key, prop] of Object.entries(nodeDef.properties)) {
                        const value = node[key] ?? prop.value;
                        if (prop.type === 'select') {
                            const opts = prop.options.map(
                                o => `<option value="${o}" ${o === value ? 'selected' : ''}>${o}</option>`
                            ).join('');
                            html += `
                                <div class="node-field">
                                    <label>${prop.label}</label>
                                    <select class="field-value node-input" data-node-id="${node.id}" data-field="${key}">
                                        ${opts}
                                    </select>
                                </div>`;
                        } else if (prop.type === 'boolean') {
                            html += `
                                <div class="toggle-switch">
                                    <span>${prop.label}</span>
                                    <label class="switch">
                                        <input type="checkbox" class="node-input" data-node-id="${node.id}" data-field="${key}" ${value ? 'checked' : ''}>
                                        <span class="slider"></span>
                                    </label>
                                </div>`;
                        } else if (prop.type === 'textarea') {
                            html += `
                                <div class="node-field">
                                    <label>${prop.label}</label>
                                    <textarea class="field-value node-input" data-node-id="${node.id}" data-field="${key}">${value}</textarea>
                                </div>`;
                        } else {
                            html += `
                                <div class="node-field">
                                    <label>${prop.label}</label>
                                    <input type="text" class="field-value node-input" data-node-id="${node.id}" data-field="${key}" value="${value}">
                                </div>`;
                        }
                    }

                    html += `</div>`;
                    el.insertAdjacentHTML('beforeend', html);

                    const expandedBody = el.querySelector('.expanded-body');
                    el.style.height = el.scrollHeight + "px";
                    requestAnimationFrame(() => {
                        el.style.height = "auto";
                    });

                    el.querySelectorAll('.node-input').forEach(input => {
                        input.addEventListener('input', () => {
                            const nodeId = parseInt(input.dataset.nodeId);
                            const field = input.dataset.field;
                            const node = state.nodes.find(n => n.id === nodeId);
                            if (node) {
                                node[field] = input.type === 'checkbox' ? input.checked : input.value;
                                saveState();
                            }
                        });
                    });
                } else {
                    const body = el.querySelector('.expanded-body');
                    if (body) body.remove();
                    el.style.height = "";
                }
            });

            const titleEl = el.querySelector('.compact-node-title');
            if (titleEl) {
                titleEl.addEventListener('blur', handleFieldChange);
                titleEl.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        e.target.blur();
                    }
                });
            }

            const channelSelector = el.querySelector('.channel-selector');
            if (channelSelector) {
                channelSelector.addEventListener('change', handleChannelChange);
            }

            const deleteButton = el.querySelector('.delete-node-button');
            if (deleteButton) {
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDeleteModal(nodeId);
                });
            }

            el.querySelectorAll('.compact-node-connector').forEach(connector => {
                connector.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    const connectorType = e.target.dataset.connector;
                    if (connectorType === 'out') {
                        onConnectorMouseDown(e, nodeId);
                    }
                });
            });
        });
    }

    function handleFieldChange(e) {
        const field = e.target;
        const nodeId = parseInt(field.dataset.nodeId);
        const fieldName = field.dataset.field;
        const node = state.nodes.find(n => n.id === nodeId);

        if (node) {
            node[fieldName] = field.value;
            saveState();
        }
    }

    function handleChannelChange(e) {
        const nodeId = parseInt(e.target.dataset.nodeId);
        const node = state.nodes.find(n => n.id === nodeId);
        if (node) {
            node.channel = e.target.value;
            saveState();
        }
    }

    function onNodeMouseDown(e, nodeId) {
        if (e.target.isContentEditable || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT' || e.target.closest('button, .compact-node-connector')) return;

        if (e.shiftKey) {
            selectedNodeIds.has(nodeId) ? selectedNodeIds.delete(nodeId) : selectedNodeIds.add(nodeId);
        } else if (!selectedNodeIds.has(nodeId)) {
            selectedNodeIds.clear();
            selectedNodeIds.add(nodeId);
        }
        isDraggingNode = true;
        const mousePos = screenToCanvasCoords(e.clientX, e.clientY, pan, scale);
        const firstNode = state.nodes.find(n => n.id === nodeId);
        dragOffset = {
            x: mousePos.x - firstNode.x,
            y: mousePos.y - firstNode.y
        };

        selectedNodeIds.forEach(id => {
            const node = state.nodes.find(n => n.id === id);
            node.dragStart = { x: node.x, y: node.y };
        });

        render();
    }
    
    function onConnectorMouseDown(e, nodeId, connectorType = null) {
        e.stopPropagation();
        isDrawingConnection = true;
        connectionStartNodeId = nodeId;
        connectionStartConnector = connectorType;
        tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempLine.setAttribute('class', 'connection-line');
        tempLine.style.stroke = 'var(--brand-color)';
        svgCanvas.appendChild(tempLine);
    }

    function handleMouseMove(e) {
        if (isPanning) {
            pan.x += e.movementX;
            pan.y += e.movementY;
            applyTransform();
            renderConnections();
            return;
        }
        if (isSelecting) {
            const rect = canvasContainer.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            const x = Math.min(selectionStart.x, currentX);
            const y = Math.min(selectionStart.y, currentY);
            const width = Math.abs(selectionStart.x - currentX);
            const height = Math.abs(selectionStart.y - currentY);
            Object.assign(selectionBox.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px` });
            return;
        }
        const mousePos = screenToCanvasCoords(e.clientX, e.clientY, pan, scale);

        if (isDraggingNode) {
            selectedNodeIds.forEach(id => {
                const node = state.nodes.find(n => n.id === id);
                if (node.type !== 'start') {
                    node.x = snapToGrid(node.dragStart.x + (mousePos.x - dragOffset.x - node.dragStart.x));
                    node.y = snapToGrid(node.dragStart.y + (mousePos.y - dragOffset.y - node.dragStart.y));
                }
            });
            render();
        } else if (isDrawingConnection) {
            const startNode = state.nodes.find(n => n.id === connectionStartNodeId);
            if (startNode && tempLine) {
                const startEl = document.getElementById(`node-${startNode.id}`);
                if (startEl) {
                    const startWidth = startEl.offsetWidth;
                    const startHeight = startEl.offsetHeight;

                    const p1 = { x: startNode.x + startWidth, y: startNode.y + startHeight / 2 };

                    const endX = mousePos.x;
                    const endY = mousePos.y;
                    const offset = Math.max(50, Math.abs(endX - p1.x) * 0.5);
                    const d = `M ${p1.x} ${p1.y} C ${p1.x + offset} ${p1.y}, ${endX - offset} ${endY}, ${endX} ${endY}`;
                    tempLine.setAttribute('d', d);
                }
            }
        }
    }

    function handleMouseUp(e) {
        if (isPanning) {
            isPanning = false;
            canvasContainer.classList.remove('panning');
        }
        if (isDraggingNode) {
            isDraggingNode = false;
            state.nodes.forEach(n => delete n.dragStart);
            saveState();
        }
        if (isDrawingConnection) {
            const endNodeEl = e.target.closest('.node');

            if (endNodeEl) {
                const endNodeId = parseInt(endNodeEl.id.split('-')[1]);
                const endNode = state.nodes.find(n => n.id === endNodeId);

                if (endNode && connectionStartNodeId !== endNodeId && endNode.type !== 'start') {
                    const alreadyExists = state.connections.some(c =>
                        c.from === connectionStartNodeId &&
                        c.to === endNodeId
                    );

                    if (!alreadyExists) {
                        state.connections.push({
                            from: connectionStartNodeId,
                            to: endNodeId,
                            condition: {}
                        });
                        saveState();
                    }
                }
            }

            if (tempLine) tempLine.remove();
            isDrawingConnection = false;
            connectionStartNodeId = null;
            connectionStartConnector = null;
            tempLine = null;
            render();
        }
        if (isSelecting) {
            const rect = selectionBox.getBoundingClientRect();
            const canvasRect = canvasContainer.getBoundingClientRect();
            const selectionRect = {
                left: (rect.left - canvasRect.left - pan.x) / scale,
                top: (rect.top - canvasRect.top - pan.y) / scale,
                right: (rect.right - canvasRect.left - pan.x) / scale,
                bottom: (rect.bottom - canvasRect.top - pan.y) / scale,
            };

            state.nodes.forEach(node => {
                const nodeEl = document.getElementById(`node-${node.id}`);
                if (!nodeEl) return;
                const nodeRect = {
                    left: node.x, top: node.y,
                    right: node.x + nodeEl.offsetWidth,
                    bottom: node.y + nodeEl.offsetHeight
                };
                if (nodeRect.left < selectionRect.right && nodeRect.right > selectionRect.left &&
                    nodeRect.top < selectionRect.bottom && nodeRect.bottom > selectionRect.top) {
                    if (e.shiftKey) {
                        selectedNodeIds.add(node.id);
                    } else {
                        if (selectedNodeIds.size === 0) selectedNodeIds.add(node.id);
                    }
                }
            });
            isSelecting = false;
            selectionBox.classList.add('hidden');
            render();
        }
    }
    
    function handleKeyDown(e) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'SELECT') return;

        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
            if (e.key === 'y') { e.preventDefault(); redo(); }
            if (e.key === 'a') { e.preventDefault(); selectedNodeIds = new Set(state.nodes.map(n => n.id)); render(); }
            if (e.key === 'd') { e.preventDefault(); duplicateSelectedNodes(); }
            if (e.key === 'c') { e.preventDefault(); copySelectedNodes(); }
            if (e.key === 'v') { e.preventDefault(); pasteNodes(contextMenuCoords.x, contextMenuCoords.y); }
        }
    }

    function handleCanvasMouseDown(e) {
        if (e.target.closest('.node, .control-button, #minimap, .node-panel, .channel-bar, .connection-controls, .settings-panel')) return;

        hideContextMenu();

        if (e.button === 0 && e.target.closest('.workflow-canvas')) {
            if (e.shiftKey) {
                isSelecting = true;
                const rect = canvasContainer.getBoundingClientRect();
                selectionStart = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                Object.assign(selectionBox.style, { left: `${selectionStart.x}px`, top: `${selectionStart.y}px`, width: '0', height: '0' });
                selectionBox.classList.remove('hidden');
            } else {
                isPanning = true;
                canvasContainer.classList.add('panning');
                selectedNodeIds.clear();
                render();
            }
        }
    }

    function showContextMenu(e) {
        e.preventDefault();
        const mousePos = screenToCanvasCoords(e.clientX, e.clientY, pan, scale);
        contextMenuCoords = { x: mousePos.x, y: mousePos.y };
        const targetNodeEl = e.target.closest('.node');
        const onNode = !!targetNodeEl;

        let items = [];

        if (onNode) {
            const nodeId = parseInt(targetNodeEl.id.split('-')[1]);
            if (!selectedNodeIds.has(nodeId)) {
                selectedNodeIds.clear();
                selectedNodeIds.add(nodeId);
                render();
            }

            const hasStartNode = Array.from(selectedNodeIds).some(id => {
                const node = state.nodes.find(n => n.id === id);
                return node && node.type === 'start';
            });

            items = [
                {
                    label: 'Duplicate',
                    action: duplicateSelectedNodes,
                    key: 'Ctrl+D',
                    disabled: selectedNodeIds.size === 0 || hasStartNode
                },
                {
                    label: 'Copy',
                    action: copySelectedNodes,
                    key: 'Ctrl+C',
                    disabled: selectedNodeIds.size === 0 || hasStartNode
                },
                { type: 'separator' },
                {
                    label: 'Delete',
                    action: deleteSelectedNodes,
                    key: 'Del',
                    disabled: selectedNodeIds.size === 0 || hasStartNode
                }
            ];
        } else {
            items = [
                { label: 'Add Node', action: () => createNodeAction('message', mousePos.x, mousePos.y) },
                { type: 'separator' },
                { label: 'Paste', action: () => pasteNodesAction(mousePos.x, mousePos.y), key: 'Ctrl+V', disabled: clipboard.length === 0 }
            ];
        }

        contextMenu.innerHTML = items.map(item => {
            if (item.type === 'separator') return `<div class="context-menu-separator"></div>`;
            const disabledClass = item.disabled ? 'disabled' : '';
            return `<div class="context-menu-item ${disabledClass}" data-action="${item.label}">
                        <span>${item.label}</span>
                        ${item.key ? `<kbd>${item.key}</kbd>` : ''}
                    </div>`;
        }).join('');

        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.classList.remove('hidden');

        document.querySelectorAll('.context-menu-item').forEach(el => {
            const actionName = el.dataset.action;
            const item = items.find(i => i.label === actionName);
            if (item && !item.disabled) {
                el.onclick = () => {
                    if (item.action) item.action();
                    hideContextMenu();
                };
            }
        });
    }

    const hideContextMenu = () => contextMenu.classList.add('hidden');

    function createNodeAction(type, x, y) {
        const { newNode, newNextId } = createNode(state, nextId, type, x, y, nodeTypes);
        nextId = newNextId;
        saveState();
        render();
        selectedNodeIds.clear();
        selectedNodeIds.add(newNode.id);
    }

    function deleteSelectedNodes() {
        if (selectedNodeIds.size === 0) return;
        showDeleteModal(Array.from(selectedNodeIds));
    }

    function duplicateSelectedNodes() {
        const { newNodes, newNextId } = duplicateSelectedNodes(state, selectedNodeIds, nextId);
        if (newNodes.length === 0) return;
        state.nodes.push(...newNodes);
        nextId = newNextId;
        selectedNodeIds.clear();
        newNodes.forEach(n => selectedNodeIds.add(n.id));
        saveState();
        render();
    }
    
    function copySelectedNodes() {
        clipboard = copySelectedNodes(state, selectedNodeIds);
    }
    
    function pasteNodesAction(x, y) {
        const { newNodes, newNextId } = pasteNodes(state, clipboard, nextId, x, y);
        if (newNodes.length === 0) return;
        state.nodes.push(...newNodes);
        nextId = newNextId;
        selectedNodeIds.clear();
        newNodes.forEach(n => selectedNodeIds.add(n.id));
        saveState();
        render();
    }

    function undo() { 
        if (historyIndex > 0) { 
            historyIndex--; 
            state = JSON.parse(JSON.stringify(history[historyIndex])); 
            render(); 
        } 
    }
    
    function redo() { 
        if (historyIndex < history.length - 1) { 
            historyIndex++; 
            state = JSON.parse(JSON.stringify(history[historyIndex])); 
            render(); 
        } 
    }

    function showPathConditionPopup(connIndex) {
        editingConnectionIndex = connIndex;
        const connection = state.connections[editingConnectionIndex];

        conditionTypeSelect.value = 'data';
        dataFieldInput.value = '';
        dataOperatorSelect.value = 'equals';
        dataValueInput.value = '';
        channelValueSelect.value = 'whatsapp';
        customConditionTextarea.value = '';

        updateConditionSections();

        if (connection && connection.condition) {
            const condition = connection.condition;
            conditionTypeSelect.value = condition.type || 'data';

            if (condition.type === 'data') {
                dataFieldInput.value = condition.field || '';
                dataOperatorSelect.value = condition.operator || 'equals';
                dataValueInput.value = condition.value || '';
            } else if (condition.type === 'channel') {
                channelValueSelect.value = condition.channel || 'whatsapp';
            } else if (condition.type === 'custom') {
                customConditionTextarea.value = condition.expression || '';
            }

            updateConditionSections();
        }

        pathConditionModal.style.display = 'flex';
        dataFieldInput.focus();
    }

    function updateConditionSections() {
        const conditionType = conditionTypeSelect.value;

        dataConditionSection.classList.add('hidden');
        dataOperatorSection.classList.add('hidden');
        dataValueSection.classList.add('hidden');
        channelConditionSection.classList.add('hidden');
        customConditionSection.classList.add('hidden');

        if (conditionType === 'data') {
            dataConditionSection.classList.remove('hidden');
            dataOperatorSection.classList.remove('hidden');
            dataValueSection.classList.remove('hidden');
        } else if (conditionType === 'channel') {
            channelConditionSection.classList.remove('hidden');
        } else if (conditionType === 'custom') {
            customConditionSection.classList.remove('hidden');
        }
    }

    function hidePathConditionPopup() {
        pathConditionModal.style.display = 'none';
        editingConnectionIndex = null;
    }

    function savePathCondition() {
        if (editingConnectionIndex !== null) {
            const connection = state.connections[editingConnectionIndex];
            if (connection) {
                const conditionType = conditionTypeSelect.value;
                let condition = { type: conditionType };

                if (conditionType === 'data') {
                    condition.field = dataFieldInput.value.trim();
                    condition.operator = dataOperatorSelect.value;
                    condition.value = dataValueInput.value.trim();
                } else if (conditionType === 'channel') {
                    condition.channel = channelValueSelect.value;
                } else if (conditionType === 'custom') {
                    condition.expression = customConditionTextarea.value.trim();
                }

                connection.condition = condition;
                saveState();
                render();
            }
        }
        hidePathConditionPopup();
    }

    function setupNodePanel() {
        Object.keys(nodeTypes).forEach(category => {
            const container = document.getElementById(`${category}-nodes`);
            if (container) {
                nodeTypes[category].forEach(nodeDef => {
                    const nodeEl = document.createElement('div');
                    nodeEl.className = 'picker-node bg-[#2a2a2a] flex items-center space-x-3';
                    nodeEl.draggable = true;
                    nodeEl.dataset.nodeType = nodeDef.type;
                    nodeEl.innerHTML = `
                        ${nodeDef.icon}
                        <span class="font-medium">${nodeDef.name}</span>
                    `;

                    nodeEl.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', nodeDef.type);
                        e.dataTransfer.effectAllowed = 'copy';
                    });

                    container.appendChild(nodeEl);
                });
            }
        });

        document.querySelectorAll('.category-header').forEach(header => {
            header.addEventListener('click', () => {
                const category = header.dataset.category;
                const nodesContainer = document.getElementById(`${category}-nodes`);
                const icon = header.querySelector('i');

                nodesContainer.classList.toggle('expanded');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });

        togglePanel.addEventListener('click', () => {
            nodePanel.classList.toggle('collapsed');
            const icon = togglePanel.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-chevron-right');

            if (nodePanel.classList.contains('collapsed')) {
                canvasContainer.style.marginLeft = '80px';
                document.querySelector('.absolute.bottom-4.left-4').style.marginLeft = '80px';
            } else {
                canvasContainer.style.marginLeft = '320px';
                document.querySelector('.absolute.bottom-4.left-4').style.marginLeft = '320px';
            }
        });

        canvasContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        canvasContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const nodeType = e.dataTransfer.getData('text/plain');
            if (nodeType) {
                const mousePos = screenToCanvasCoords(e.clientX, e.clientY, pan, scale);
                createNodeAction(nodeType, mousePos.x, mousePos.y);
            }
        });
    }

    function setupChannelBar() {
        toggleChannels.addEventListener('click', () => {
            channelBar.classList.toggle('collapsed');
            const icon = toggleChannels.querySelector('i');
            icon.classList.toggle('fa-comments');
            icon.classList.toggle('fa-chevron-left');
        });

        document.querySelectorAll('.channel-button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.channel-button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                activeChannel = button.dataset.channel;
                render();
            });
        });
    }

    function setupModal() {
        confirmDelete.addEventListener('click', () => {
            if (nodesToDelete.length > 0) {
                deleteNodes(state, nodesToDelete);
                saveState();
                render();
            }
            hideDeleteModal();
        });

        cancelDelete.addEventListener('click', hideDeleteModal);
        deleteModal.addEventListener('click', (e) => {
            if (e.target === deleteModal) {
                hideDeleteModal();
            }
        });
    }

    function setupSettingsPanel() {
        closeSettings.addEventListener('click', closeSettingsPanel);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#settings-panel') &&
                settingsPanel.classList.contains('open')) {
                closeSettingsPanel();
            }
        });
    }

    function updateSettingsPanel(node) {
        const nodeDef = Object.values(nodeTypes).flat().find(n => n.type === node.type);

        if (!nodeDef) {
            hideNodeSettings();
            return;
        }

        let settingsHTML = `<h4 class="font-semibold mb-4">${nodeDef.name} Settings</h4>`;

        if (nodeDef.properties) {
            Object.keys(nodeDef.properties).forEach(propKey => {
                const prop = nodeDef.properties[propKey];
                const value = node[propKey] ?? prop.value;

                let fieldHTML = '';

                if (prop.type === 'textarea') {
                    fieldHTML = `
                        <div class="node-field">
                            <label>${prop.label}</label>
                            <textarea class="field-value settings-field" data-node-id="${node.id}" data-field="${propKey}" placeholder="${prop.label}">${value}</textarea>
                        </div>
                    `;
                } else if (prop.type === 'select') {
                    let optionsHTML = '';
                    prop.options.forEach(option => {
                        optionsHTML += `<option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>`;
                    });
                    fieldHTML = `
                        <div class="node-field">
                            <label>${prop.label}</label>
                            <select class="field-value settings-field" data-node-id="${node.id}" data-field="${propKey}">
                                ${optionsHTML}
                            </select>
                        </div>
                    `;
                } else if (prop.type === 'boolean') {
                    fieldHTML = `
                        <div class="toggle-switch">
                            <span>${prop.label}</span>
                            <label class="switch">
                                <input type="checkbox" class="field-value settings-field" data-node-id="${node.id}" data-field="${propKey}" ${value ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    `;
                } else if (prop.type === 'number') {
                    fieldHTML = `
                        <div class="node-field">
                            <label>${prop.label}</label>
                            <input type="number" class="field-value settings-field" data-node-id="${node.id}" data-field="${propKey}" value="${value}" placeholder="${prop.label}">
                        </div>
                    `;
                } else {
                    fieldHTML = `
                        <div class="node-field">
                            <label>${prop.label}</label>
                            <input type="text" class="field-value settings-field" data-node-id="${node.id}" data-field="${propKey}" value="${value}" placeholder="${prop.label}">
                        </div>
                    `;
                }

                settingsHTML += fieldHTML;
            });
        }

        nodeSettings.innerHTML = settingsHTML;
        noNodeSelected.classList.add('hidden');
        nodeSettings.classList.remove('hidden');

        nodeSettings.querySelectorAll('.settings-field').forEach(field => {
            if (field.type === 'checkbox') {
                field.addEventListener('change', handleSettingsFieldChange);
            } else {
                field.addEventListener('change', handleSettingsFieldChange);
                field.addEventListener('input', handleSettingsFieldChange);
            }
        });
    }

    function hideNodeSettings() {
        noNodeSelected.classList.remove('hidden');
        nodeSettings.classList.add('hidden');
    }

    function openSettingsPanel(node) {
        updateSettingsPanel(node);
        settingsPanel.classList.add('open');
    }

    function closeSettingsPanel() {
        settingsPanel.classList.remove('open');
    }
    // #endregion

    // #region --- INITIALIZATION ---
    function init() {
        setupNodePanel();
        setupChannelBar();
        setupModal();
        setupSettingsPanel();

        document.documentElement.setAttribute('data-theme', currentTheme);

        const themeIcon = document.querySelector('#theme-toggle i');
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeIcon.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeIcon.title = 'Switch to Dark Mode';
        }

        document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

        svgCanvas.addEventListener('mousedown', e => {
            const conditionButton = e.target.closest('.condition-btn');
            const deleteButton = e.target.closest('.delete-btn');

            if (conditionButton) {
                e.stopPropagation();
                const connIndex = parseInt(conditionButton.dataset.connIndex);
                showPathConditionPopup(connIndex);
                return;
            }

            if (deleteButton) {
                e.stopPropagation();
                const connIndex = parseInt(deleteButton.dataset.connIndex);
                if (!isNaN(connIndex) && state.connections[connIndex]) {
                    state.connections.splice(connIndex, 1);
                    saveState();
                    render();
                }
                return;
            }
        });

        conditionTypeSelect.addEventListener('change', updateConditionSections);

        canvasContainer.addEventListener('mousedown', handleCanvasMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        canvasContainer.addEventListener('contextmenu', showContextMenu);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#context-menu')) hideContextMenu();
        });

        saveConditionButton.addEventListener('click', savePathCondition);
        cancelConditionButton.addEventListener('click', hidePathConditionPopup);
        pathConditionModal.addEventListener('click', (e) => {
            if (e.target === pathConditionModal) {
                hidePathConditionPopup();
            }
        });

        canvasContainer.addEventListener('wheel', e => {
            e.preventDefault();
            const zoomFactor = 1.1;
            const oldScale = scale;
            scale *= e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
            scale = Math.max(0.1, Math.min(5, scale));
            const rect = canvasContainer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            pan.x = mouseX - (mouseX - pan.x) * (scale / oldScale);
            pan.y = mouseY - (mouseY - pan.y) * (scale / oldScale);
            applyTransform();
            renderConnections();
        }, { passive: false });

        undoButton.addEventListener('click', undo);
        redoButton.addEventListener('click', redo);
        zoomInButton.addEventListener('click', () => {
            scale = Math.min(5, scale * 1.2);
            applyTransform();
            renderConnections();
        });
        zoomOutButton.addEventListener('click', () => {
            scale = Math.max(0.1, scale / 1.2);
            applyTransform();
            renderConnections();
        });

        loadState();
        render();
    }

    init();
    // #endregion
});

// Global event listeners
document.addEventListener('click', (e) => {
    const isInsideNode = e.target.closest('.node');
    if (!isInsideNode) {
        document.querySelectorAll('.node.expanded').forEach(n => {
            n.classList.remove('expanded');
            const body = n.querySelector('.expanded-body');
            if (body) body.remove();
        });
    }
});

document.querySelectorAll('.category-header').forEach(header => {
    header.addEventListener('click', () => {
        const section = header.closest('.category-section');
        section.classList.toggle('expanded');
    });
});

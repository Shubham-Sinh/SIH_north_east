document.addEventListener('DOMContentLoaded', function () {
            const dataStore = {
                seasonalData: {
                    monsoon: { labels: ['Diarrhea', 'Cholera', 'Typhoid', 'Hepatitis A'], data: [85, 60, 45, 30] },
                    dry: { labels: ['Diarrhea', 'Cholera', 'Typhoid', 'Hepatitis A'], data: [20, 10, 8, 5] }
                },
                diseaseData: { labels: ['Diarrhea', 'Cholera', 'Typhoid', 'Hepatitis A'], data: [45, 25, 20, 10] },
                diagramDetails: {
                    "node-data-collection": { title: "1. Community Intelligence", text: `Data from <span class="asha-tooltip" title="Accredited Social Health Activist">ASHA workers</span>, clinics, and volunteers is collected via a multilingual, offline-first mobile app. This creates a real-time, ground-level health map.` },
                    "node-water-monitoring": { title: "2. Environmental Data", text: "The system integrates with low-cost IoT sensors and manual test kits to continuously monitor water quality, adding a critical layer of environmental context to health data." },
                    "node-ai-engine": { title: "3. AI Prediction Core", text: "Health, water, and climate data are fed into Python & TensorFlow models. The AI analyzes complex patterns to forecast potential outbreaks with high accuracy." },
                    "node-alerts": { title: "4. Rapid Response Alerts", text: "When the AI flags a high-risk area, it triggers immediate SMS and push notifications to health officials, enabling a proactive, targeted response before an outbreak escalates." },
                    "node-dashboard": { title: "5. Actionable Dashboards", text: "Officials can access a web-based dashboard to visualize hotspots, track intervention effectiveness, and allocate resources with data-driven precision." }
                },
                tabContent: {
                    1: { title: "Community Mobile App", text: `Built with Flutter for cross-platform and offline functionality, the app features an icon-based UI for low digital literacy users and supports tribal languages to ensure inclusivity.` },
                    2: { title: "AI-Based Outbreak Prediction", text: "Our core innovation. The AI engine uses machine learning to identify subtle patterns that precede an outbreak, shifting the public health paradigm from reactive to predictive." },
                    3: { title: "Water Quality Sensors & Kits", text: "Integration with both manual test kits and automated low-cost IoT sensors allows for flexible and scalable monitoring of water sources, providing critical environmental context." },
                    4: { title: "Awareness & Education Modules", text: "The platform includes targeted educational modules delivered via the app to promote hygiene awareness and disease prevention, empowering the community to be the first line of defense." }
                }
            };

            // Charting, Diagram, and Tab logic (condensed for brevity)
            let seasonalChart, diseaseChart;
            function createSeasonalChart(season) { const ctx = document.getElementById('seasonalSpikeChart').getContext('2d'); if (seasonalChart) seasonalChart.destroy(); seasonalChart = new Chart(ctx, { type: 'bar', data: { labels: dataStore.seasonalData[season].labels, datasets: [{ label: 'Reported Cases', data: dataStore.seasonalData[season].data, backgroundColor: '#007BFF', borderColor: '#0056b3', borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false, animation: { duration: 1000, easing: 'easeOutCubic' }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => ` Cases: ${context.parsed.y}` } } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Number of Reported Cases' } } } } }); }
            function createDiseaseChart() { const ctx = document.getElementById('diseaseDistributionChart').getContext('2d'); diseaseChart = new Chart(ctx, { type: 'doughnut', data: { labels: dataStore.diseaseData.labels, datasets: [{ label: 'Disease Distribution', data: dataStore.diseaseData.data, backgroundColor: ['#007BFF', '#5CACEE', '#87CEFA', '#B0E0E6'], hoverOffset: 8 }] }, options: { responsive: true, maintainAspectRatio: false, animation: { animateScale: true, animateRotate: true }, plugins: { legend: { position: 'bottom' } } } }); }
            createSeasonalChart('monsoon'); createDiseaseChart();
            document.getElementById('monsoonBtn').addEventListener('click', () => { createSeasonalChart('monsoon'); document.getElementById('monsoonBtn').className = 'bg-[var(--primary-accent)] text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform'; document.getElementById('dryBtn').className = 'bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform'; });
            document.getElementById('dryBtn').addEventListener('click', () => { createSeasonalChart('dry'); document.getElementById('dryBtn').className = 'bg-[var(--primary-accent)] text-white px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform'; document.getElementById('monsoonBtn').className = 'bg-gray-200 text-gray-700 px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform'; });
            const diagramNodes = document.querySelectorAll('.flow-node'); const detailsPanel = document.getElementById('diagram-details'); diagramNodes.forEach(node => { node.addEventListener('click', () => { diagramNodes.forEach(n => n.classList.remove('active-diagram-node')); node.classList.add('active-diagram-node'); const details = dataStore.diagramDetails[node.id]; if (details) { detailsPanel.classList.remove('active'); setTimeout(() => { document.getElementById('details-title').textContent = details.title; document.getElementById('details-text').innerHTML = details.text; detailsPanel.classList.add('active'); }, 250); } }); });
            const tabs = document.querySelectorAll('.tab-btn'); const tabContentContainer = document.getElementById('tab-content'); function updateTabContent(tabId) { const content = dataStore.tabContent[tabId]; if (content) { tabContentContainer.classList.remove('active'); setTimeout(() => { tabContentContainer.innerHTML = `<div class="p-1"><h4 class="font-bold text-xl text-gray-800 mb-2">${content.title}</h4><p class="text-gray-600 leading-relaxed">${content.text}</p></div>`; tabContentContainer.classList.add('active'); }, 250); } }
            tabs.forEach(tab => { tab.addEventListener('click', (e) => { tabs.forEach(t => { t.classList.remove('active-tab'); t.classList.add('text-gray-500', 'hover:text-gray-700'); }); e.target.classList.add('active-tab'); e.target.classList.remove('text-gray-500', 'hover:text-gray-700'); updateTabContent(e.target.dataset.tab); }); });
            updateTabContent(1);

            // Header scroll effect
            const header = document.getElementById('main-header');
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 50);
            });

            // Section fade-in effect
            const sections = document.querySelectorAll('.fade-in-section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
            }, { threshold: 0.1 });
            sections.forEach(section => observer.observe(section));

            // --- Data Collection Button Logic (User Added & Corrected) ---
            const dataCollectionBtn = document.getElementById('data-collection-btn');
            if (dataCollectionBtn) {
                dataCollectionBtn.addEventListener("click", () => {
                    window.open("dataentry.html", "_blank");
                });
            }
            

            // --- Chatbot Logic ---
            const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
            const chatWindow = document.getElementById('chat-window');
            const chatMessages = document.getElementById('chat-messages');
            const chatOptions = document.getElementById('chat-options');
            const chatData = {
                'start': { message: "Hello! How can I help you learn about Project AquaSure?", options: { 'innovation': "What is the core innovation?", 'tech': "What tech stack is used?", 'offline': "Is the app offline-capable?" } },
                'innovation': { message: "Our core innovation is flipping the model from reactive to predictive. We use AI to forecast outbreaks *before* they happen, enabling a proactive response.", options: { 'start': 'Back to main menu', 'tech': 'Learn about the tech stack' } },
                'tech': { message: "We use a robust stack: Python & TensorFlow for AI, Flutter for the mobile app, and AWS for scalable cloud infrastructure.", options: { 'start': 'Back to main menu', 'innovation': 'Ask about innovation' } },
                'offline': { message: "Absolutely. The mobile app is designed with an 'Offline-First' approach. Data is stored locally in remote areas and synced automatically when connectivity is restored.", options: { 'start': 'Back to main menu', 'tech': 'What is the tech stack?' } }
            };
            function addMessage(text, sender) { const messageEl = document.createElement('div'); messageEl.className = `chat-message p-3 rounded-lg mb-2 max-w-[85%] ${sender === 'bot' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end'}`; messageEl.textContent = text; chatMessages.appendChild(messageEl); chatMessages.scrollTop = chatMessages.scrollHeight; }
            function showOptions(options) { chatOptions.innerHTML = ''; for (const key in options) { const button = document.createElement('button'); button.className = 'w-full text-left p-2 bg-white border border-gray-300 rounded-md mb-2 hover:bg-gray-100 transition-colors'; button.textContent = options[key]; button.onclick = () => { addMessage(options[key], 'user'); handleInteraction(key); }; chatOptions.appendChild(button); } }
            function handleInteraction(key) { const response = chatData[key]; setTimeout(() => { addMessage(response.message, 'bot'); showOptions(response.options); }, 500); }
            chatbotToggleBtn.addEventListener('click', () => { chatWindow.classList.toggle('open'); if (chatWindow.classList.contains('open') && chatMessages.children.length === 0) { handleInteraction('start'); } });
        });
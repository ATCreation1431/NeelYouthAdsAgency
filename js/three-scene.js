// Three.js 3D Scene Management
class ThreeScene {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            background: 0x000000,
            alpha: true,
            antialias: true,
            ...options
        };
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.models = [];
        this.lights = [];
        
        this.init();
        this.animate();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: this.options.alpha,
            antialias: this.options.antialias
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setClearColor(this.options.background, this.options.alpha ? 0 : 1);
        this.container.appendChild(this.renderer.domElement);
        
        // Add lights
        this.setupLights();
        
        // Handle resize
        window.addEventListener('resize', () => this.handleResize());
    }

    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);
        
        // Point light
        const pointLight = new THREE.PointLight(0x667eea, 1, 100);
        pointLight.position.set(0, 10, 10);
        this.scene.add(pointLight);
        this.lights.push(pointLight);
    }

    handleResize() {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    addModel(model) {
        this.scene.add(model);
        this.models.push(model);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate models
        this.models.forEach((model, index) => {
            model.rotation.y += 0.01 * (index + 1);
            model.rotation.x += 0.005 * (index + 1);
        });
        
        // Animate lights
        if (this.lights[2]) { // Point light
            this.lights[2].position.x = Math.sin(Date.now() * 0.001) * 20;
            this.lights[2].position.z = Math.cos(Date.now() * 0.001) * 20;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    dispose() {
        // Clean up resources
        this.models.forEach(model => {
            if (model.geometry) model.geometry.dispose();
            if (model.material) {
                if (Array.isArray(model.material)) {
                    model.material.forEach(mat => mat.dispose());
                } else {
                    model.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
    }
}

// 3D Model Factory
class ModelFactory {
    static createLaptop() {
        const group = new THREE.Group();
        
        // Laptop base
        const baseGeometry = new THREE.BoxGeometry(4, 0.2, 3);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        group.add(base);
        
        // Laptop screen
        const screenGeometry = new THREE.BoxGeometry(3.8, 2.5, 0.1);
        const screenMaterial = new THREE.MeshLambertMaterial({ color: 0x111111 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 1.35, -1.45);
        screen.rotation.x = -Math.PI * 0.05;
        group.add(screen);
        
        // Screen content (simulating a dashboard)
        const contentGeometry = new THREE.PlaneGeometry(3.4, 2.1);
        const contentMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x667eea,
            transparent: true,
            opacity: 0.8
        });
        const content = new THREE.Mesh(contentGeometry, contentMaterial);
        content.position.set(0, 1.35, -1.4);
        content.rotation.x = -Math.PI * 0.05;
        group.add(content);
        
        return group;
    }

    static createChart() {
        const group = new THREE.Group();
        
        // Chart bars
        const barHeights = [1, 2.5, 1.8, 3.2, 2.8, 3.8, 4.2];
        const barWidth = 0.3;
        const barDepth = 0.3;
        
        barHeights.forEach((height, index) => {
            const barGeometry = new THREE.BoxGeometry(barWidth, height, barDepth);
            const barMaterial = new THREE.MeshLambertMaterial({ 
                color: new THREE.Color().setHSL((index * 0.1) % 1, 0.8, 0.6) 
            });
            const bar = new THREE.Mesh(barGeometry, barMaterial);
            bar.position.x = (index - 3) * 0.5;
            bar.position.y = height / 2;
            group.add(bar);
        });
        
        // Chart base
        const baseGeometry = new THREE.BoxGeometry(4, 0.1, 2);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.05;
        group.add(base);
        
        return group;
    }

    static createMobilePhone() {
        const group = new THREE.Group();
        
        // Phone body
        const bodyGeometry = new THREE.BoxGeometry(1.2, 2.4, 0.2);
        const bodyGeometry2 = bodyGeometry.clone();
        bodyGeometry2.vertices = bodyGeometry2.vertices.map(v => {
            v.x *= 0.9;
            v.y *= 0.95;
            return v;
        });
        
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        group.add(body);
        
        // Phone screen
        const screenGeometry = new THREE.PlaneGeometry(1, 2);
        const screenMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x667eea,
            transparent: true,
            opacity: 0.9
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.z = 0.11;
        group.add(screen);
        
        // App icons (small cubes)
        const iconGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.02);
        const colors = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0x96ceb4, 0xfeca57, 0xff9ff3];
        
        for (let i = 0; i < 6; i++) {
            const iconMaterial = new THREE.MeshBasicMaterial({ color: colors[i] });
            const icon = new THREE.Mesh(iconGeometry, iconMaterial);
            icon.position.x = (i % 3 - 1) * 0.25;
            icon.position.y = Math.floor(i / 3) * 0.25 - 0.125;
            icon.position.z = 0.12;
            group.add(icon);
        }
        
        return group;
    }

    static createAnalyticsDashboard() {
        const group = new THREE.Group();
        
        // Main panel
        const panelGeometry = new THREE.BoxGeometry(4, 3, 0.1);
        const panelMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        group.add(panel);
        
        // Dashboard elements
        const elements = [
            { type: 'bar', x: -1.5, y: 0.5, color: 0x667eea },
            { type: 'pie', x: 0.5, y: 0.5, color: 0xff6b6b },
            { type: 'line', x: -1.5, y: -0.5, color: 0x4ecdc4 },
            { type: 'metric', x: 0.5, y: -0.5, color: 0xfeca57 }
        ];
        
        elements.forEach(element => {
            let mesh;
            if (element.type === 'bar') {
                const barGroup = new THREE.Group();
                for (let i = 0; i < 4; i++) {
                    const barGeometry = new THREE.BoxGeometry(0.1, 0.2 + i * 0.1, 0.02);
                    const barMaterial = new THREE.MeshBasicMaterial({ color: element.color });
                    const bar = new THREE.Mesh(barGeometry, barMaterial);
                    bar.position.x = i * 0.15 - 0.225;
                    bar.position.y = (0.2 + i * 0.1) / 2;
                    barGroup.add(bar);
                }
                barGroup.position.set(element.x, element.y, 0.06);
                group.add(barGroup);
            } else if (element.type === 'pie') {
                const pieGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 8);
                const pieMaterial = new THREE.MeshBasicMaterial({ color: element.color });
                mesh = new THREE.Mesh(pieGeometry, pieMaterial);
                mesh.position.set(element.x, element.y, 0.06);
                group.add(mesh);
            } else if (element.type === 'line') {
                const points = [];
                for (let i = 0; i < 5; i++) {
                    points.push(new THREE.Vector3(i * 0.1 - 0.2, Math.sin(i) * 0.1, 0));
                }
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                const lineMaterial = new THREE.LineBasicMaterial({ color: element.color });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                line.position.set(element.x, element.y, 0.06);
                group.add(line);
            } else if (element.type === 'metric') {
                const metricGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.02);
                const metricMaterial = new THREE.MeshBasicMaterial({ color: element.color });
                mesh = new THREE.Mesh(metricGeometry, metricMaterial);
                mesh.position.set(element.x, element.y, 0.06);
                group.add(mesh);
            }
        });
        
        return group;
    }

    static createSocialMediaIcons() {
        const group = new THREE.Group();
        
        const iconColors = [0x1877f2, 0x1da1f2, 0xe4405f, 0x0077b5, 0xff0000, 0x25d366];
        const positions = [
            { x: -1.5, y: 0.5 }, { x: 0, y: 0.5 }, { x: 1.5, y: 0.5 },
            { x: -1.5, y: -0.5 }, { x: 0, y: -0.5 }, { x: 1.5, y: -0.5 }
        ];
        
        iconColors.forEach((color, index) => {
            const iconGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
            const iconMaterial = new THREE.MeshLambertMaterial({ color });
            const icon = new THREE.Mesh(iconGeometry, iconMaterial);
            
            icon.position.set(positions[index].x, positions[index].y, 0);
            icon.rotation.x = Math.PI / 2;
            
            group.add(icon);
        });
        
        return group;
    }

    static createDigitalGlobe() {
        const group = new THREE.Group();
        
        // Globe
        const globeGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const globeMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x4ecdc4,
            transparent: true,
            opacity: 0.8
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        group.add(globe);
        
        // Connection lines (wireframe effect)
        const wireframeGeometry = new THREE.SphereGeometry(1.51, 16, 16);
        const wireframeMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x667eea,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
        group.add(wireframe);
        
        // Floating data points
        for (let i = 0; i < 20; i++) {
            const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            
            // Random position on sphere surface
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            const radius = 1.6;
            
            point.position.x = radius * Math.sin(phi) * Math.cos(theta);
            point.position.y = radius * Math.sin(phi) * Math.sin(theta);
            point.position.z = radius * Math.cos(phi);
            
            group.add(point);
        }
        
        return group;
    }
}

// Initialize 3D scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hero section 3D scene
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        const heroScene = new ThreeScene(heroCanvas, {
            background: 0x000000,
            alpha: true
        });
        
        // Add floating digital elements
        const laptop = ModelFactory.createLaptop();
        laptop.position.set(-3, 0, 0);
        laptop.scale.set(0.8, 0.8, 0.8);
        heroScene.addModel(laptop);
        
        const phone = ModelFactory.createMobilePhone();
        phone.position.set(3, 0, 2);
        phone.rotation.z = Math.PI / 12;
        heroScene.addModel(phone);
        
        const chart = ModelFactory.createChart();
        chart.position.set(0, 2, -2);
        chart.scale.set(0.6, 0.6, 0.6);
        heroScene.addModel(chart);
        
        const globe = ModelFactory.createDigitalGlobe();
        globe.position.set(0, -2, 1);
        globe.scale.set(0.5, 0.5, 0.5);
        heroScene.addModel(globe);
        
        heroScene.camera.position.set(0, 0, 8);
    }
    
    // Process step 3D scenes
    const processSteps = [
        { id: 'step1-canvas', model: 'laptop' },
        { id: 'step2-canvas', model: 'dashboard' },
        { id: 'step3-canvas', model: 'chart' }
    ];
    
    processSteps.forEach(({ id, model }) => {
        const canvas = document.getElementById(id);
        if (canvas) {
            const scene = new ThreeScene(canvas, {
                background: 0xf8f9fa,
                alpha: false
            });
            
            let modelMesh;
            switch (model) {
                case 'laptop':
                    modelMesh = ModelFactory.createLaptop();
                    break;
                case 'dashboard':
                    modelMesh = ModelFactory.createAnalyticsDashboard();
                    break;
                case 'chart':
                    modelMesh = ModelFactory.createChart();
                    break;
            }
            
            if (modelMesh) {
                scene.addModel(modelMesh);
                scene.camera.position.set(0, 0, 6);
            }
        }
    });
    
    // Curriculum section 3D scene
    const curriculumCanvas = document.getElementById('curriculum-canvas');
    if (curriculumCanvas) {
        const curriculumScene = new ThreeScene(curriculumCanvas, {
            background: 0xffffff,
            alpha: false
        });
        
        const socialIcons = ModelFactory.createSocialMediaIcons();
        curriculumScene.addModel(socialIcons);
        
        const dashboard = ModelFactory.createAnalyticsDashboard();
        dashboard.position.set(0, 0, -2);
        dashboard.scale.set(0.7, 0.7, 0.7);
        curriculumScene.addModel(dashboard);
        
        curriculumScene.camera.position.set(0, 0, 5);
    }
});

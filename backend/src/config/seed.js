import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/soliveira3/ecommerce',
        imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        featured: true,
        order: 1
    },
    {
        title: 'Task Management App',
        description: 'Collaborative task management with real-time updates',
        tags: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
        demoUrl: 'https://tasks.example.com',
        githubUrl: 'https://github.com/soliveira3/tasks',
        imageGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        featured: true,
        order: 2
    },
    {
        title: 'Weather Dashboard',
        description: 'Real-time weather data visualization and forecasting',
        tags: ['React', 'API Integration', 'Chart.js'],
        demoUrl: 'https://weather.example.com',
        githubUrl: 'https://github.com/soliveira3/weather',
        imageGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        featured: true,
        order: 3
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Clear existing projects
        await Project.deleteMany({});
        console.log('Cleared existing projects');

        // Insert seed data
        await Project.insertMany(projects);
        console.log('Seed data inserted successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
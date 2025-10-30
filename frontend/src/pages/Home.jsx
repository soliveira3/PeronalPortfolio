import Hero from '../components/Hero';
import Projects from '../components/Projects';
import AcademicProjects from '../components/AcademicProjects'

function Home() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Projects/>
            <AcademicProjects/>
        </div>
    );
}

export default Home;
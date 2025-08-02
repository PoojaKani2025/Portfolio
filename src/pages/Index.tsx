import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, ExternalLink, Code, Server, Palette, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const projects = [
    {
      title: "E-Learning Platform",
      description: "Full-stack educational platform with Django backend and responsive frontend",
      technologies: ["Django", "Python", "JavaScript", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
    },
    {
      title: "Enterprise Dashboard",
      description: "Business analytics dashboard with Spring Boot API and modern UI",
      technologies: ["Spring Boot", "Java", "HTML", "CSS"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      title: "E-Commerce Solution",
      description: "Complete online store with payment integration and inventory management",
      technologies: ["Django", "JavaScript", "Bootstrap", "Python"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
    },
    {
      title: "Content Management System",
      description: "Custom CMS with user authentication and content publishing features",
      technologies: ["Spring Boot", "Java", "HTML", "CSS"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
    }
  ];

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Website Design",
      description: "Modern, responsive websites built with clean code and user-friendly interfaces"
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "Robust server-side solutions using Django, Spring Boot, and modern frameworks"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Design",
      description: "Efficient database architecture and optimization for scalable applications"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Full-Stack Solutions",
      description: "End-to-end development combining beautiful frontends with powerful backends"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Core Fusion
              </div>
              <div className="hidden md:flex space-x-6">
                {['home', 'about', 'portfolio', 'services', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-colors ${
                      activeSection === section
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="border-gray-300 dark:border-gray-600"
            >
              {darkMode ? '☀️' : '🌙'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-4 border-white/30">
                <span className="text-4xl font-bold">P</span>
              </div>
              <h3 className="text-xl font-semibold">Pooja Pandiyan</h3>
              <p className="text-purple-200">Frontend Specialist</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-4 border-white/30">
                <span className="text-4xl font-bold">K</span>
              </div>
              <h3 className="text-xl font-semibold">Kanimozhi</h3>
              <p className="text-purple-200">Backend Developer</p>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Full-Stack<br />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Web Solutions
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
            Dynamic freelancing duo turning your ideas into powerful web applications with clean design and robust backend systems
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg"
              onClick={() => scrollToSection('portfolio')}
            >
              View Our Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-purple-600 hover:bg-white/10 px-8 py-3 text-lg"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              About Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collaborative team of passionate developers bringing together frontend creativity and backend expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">P</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Pooja Pandiyan</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Frontend specialist with expertise in creating beautiful, responsive user interfaces. 
                  Skilled in HTML, CSS, JavaScript, and Bootstrap, with a passion for clean design and optimal user experience.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive Design"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/core-fusion"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold text-white">K</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Kanimozhi</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Backend developer specializing in robust server-side solutions. 
                  Experienced with Python, Java, Django, and Spring Boot, focused on building scalable and efficient systems.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Python", "Java", "Django", "Spring Boot", "Database Design"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <a
                  href="https://www.linkedin.com/in/core-fusion"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  LinkedIn Profile
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Showcasing our collaborative projects that combine beautiful frontend design with powerful backend functionality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 text-purple-800 dark:text-purple-200 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive web development services tailored to bring your digital vision to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Ready to bring your project to life? Get in touch with us to discuss your requirements
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Pooja Pandiyan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3" />
                      <span>codemint.team@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3" />
                      <span>+91 9384487852</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-3" />
                      <a
                        href="https://www.linkedin.com/in/core-fusion"
                        className="hover:text-purple-200 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h4 className="text-xl font-semibold mb-4">Kanimozhi</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3" />
                      <span>codemint.team@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3" />
                      <span>+91 8148501860</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="h-5 w-5 mr-3" />
                      <a
                        href="https://www.linkedin.com/in/core-fusion"
                        className="hover:text-purple-200 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Core Fusion 
            </div>
          </div>
          <p className="text-gray-400">
            © 2025 Pooja Pandiyan & Kanimozhi. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

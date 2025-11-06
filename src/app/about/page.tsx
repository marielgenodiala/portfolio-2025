import Heading from "@/ui/Heading";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Heading type="h2" variant="section" className="text-white mb-6">
            About Me
          </Heading>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
            <p className="text-lg text-gray-300 mb-6">
              I&apos;m a passionate developer with a love for creating beautiful,
              functional, and user-friendly applications. My journey in web
              development began with curiosity and has evolved into a career
              focused on delivering exceptional digital experiences.
            </p>
            <p className="text-lg text-gray-300 mb-6">
              With expertise in modern web technologies, I bring ideas to life
              through clean, efficient code and thoughtful design. I believe in
              the power of technology to solve real-world problems and create
              meaningful connections.
            </p>
            <p className="text-lg text-gray-300">
              When I&apos;m not coding, you can find me exploring new technologies,
              contributing to open source projects, or sharing knowledge with
              the developer community. I&apos;m always eager to learn and grow in
              this ever-evolving field.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">React</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">Next.js</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">TypeScript</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">Tailwind CSS</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">Node.js</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="font-semibold text-white">MongoDB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Experience & Education
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Professional Experience
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white">
                    Senior Frontend Developer
                  </h4>
                  <p className="text-gray-300">Company Name • 2022 - Present</p>
                  <p className="text-sm text-gray-400">
                    Leading frontend development initiatives and mentoring
                    junior developers
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white">
                    Frontend Developer
                  </h4>
                  <p className="text-gray-300">
                    Previous Company • 2020 - 2022
                  </p>
                  <p className="text-sm text-gray-400">
                    Developed responsive web applications using React and modern
                    CSS frameworks
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Education
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-white">
                    Computer Science Degree
                  </h4>
                  <p className="text-gray-300">University Name • 2016 - 2020</p>
                  <p className="text-sm text-gray-400">
                    Focused on software engineering and web development
                  </p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-semibold text-white">Certifications</h4>
                  <p className="text-gray-300">Various Platforms • Ongoing</p>
                  <p className="text-sm text-gray-400">
                    AWS, Google Cloud, and other technology certifications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

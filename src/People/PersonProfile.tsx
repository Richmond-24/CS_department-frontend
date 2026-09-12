import Image from '../components/Image'

type Person = {
  name: string
  role: string
  specialization?: string
  image?: string
  email?: string
  linkedin?: string
  tiktok?: string
}

const peopleIndex: Record<string, Person> = {
  'patrick-mensah': {
    name: 'Prof. Patrick K. Mensah',
    role: 'Head of Department',
    specialization: 'Artificial Intelligence & Computer Science',
    image: '/images/people/patrick-mensah.jpg',
    email: 'patrick.mensah@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  },
  'fred-asante': {
    name: 'Assoc. prof. Obed',
    role: 'Senior Lecturer',
    specialization: 'Information Technology & Networks',
    image: '/images/people/fred-asante.jpg',
    email: 'fred.asante@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  }
  ,
  'peter-mensah': {
    name: 'Dr. Vivian',
    role: 'Senior Lecturer',
    specialization: 'Quantum Computing',
    image: '/images/people/peter-mensah.jpg',
    email: 'peter.mensah@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  },
  'ama-owusu': {
    name: 'Dr. Ama Owusu',
    role: 'Lecturer',
    specialization: 'Data Science & Machine Learning',
    image: '/images/people/ama-owusu.jpg',
    email: 'ama.owusu@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  },
  'daniel-boateng': {
    name: 'Dr. Daniel Boateng',
    role: 'Lecturer',
    specialization: 'Software Engineering',
    image: '/images/people/daniel-boateng.jpg',
    email: 'daniel.boateng@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  },
  'michael-asare': {
    name: 'Dr. Michael Asare',
    role: 'Lecturer',
    specialization: 'Cybersecurity & Computer Networks',
    image: '/images/people/michael-asare.jpg',
    email: 'michael.asare@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  }

  , 'patience-mensah': {
    name: 'Mrs. Patience Mensah',
    role: 'Department Administrator',
    specialization: 'Administrative Support',
    image: '/images/people/patience-mensah.jpg',
    email: 'patience.mensah@uenr.edu.gh',
    linkedin: 'https://www.linkedin.com/'
  },
  'ada-owusu': {
    name: 'Prof. Ada Owusu',
    role: 'Head of Department',
    specialization: 'Department Leadership',
    image: '/images/people/executives/ada-owusu.jpg',
    email: 'ada.owusu@example.com',
    linkedin: '#'
  },
  'emmanuel-danso': {
    name: 'Dr. Emmanuel Danso',
    role: 'Academic Coordinator',
    specialization: 'Programme Coordination',
    image: '/images/people/executives/emmanuel-danso.jpg',
    email: 'emmanuel.danso@example.com',
    linkedin: '#'
  },
  'michael-osei': {
    name: 'Mr. Michael Osei',
    role: 'Industry and Partnerships Lead',
    specialization: 'Partnerships & Outreach',
    image: '/images/people/executives/michael-osei.jpg',
    email: 'michael.osei@example.com',
    linkedin: '#'
  }
}

function PersonProfile() {
  const raw = (window.location.hash || '').replace('#people/', '').replace('#', '')
  const slug = raw.split('/').pop() || raw
  const person = peopleIndex[slug]

  if (!person) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl p-6 text-center">
          <h2 className="text-2xl font-bold">Profile not found</h2>
          <p className="mt-4 text-sm text-gray-600">We couldn't find that lecturer's profile.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full md:w-1/3">
            <div className="relative overflow-hidden rounded-xl bg-gray-100">
              {person.image && (
                <Image src={person.image} alt={person.name} fill className="object-cover" />
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-[#080d4f]">{person.name}</h1>
            <p className="mt-2 text-lg font-semibold text-[#078bc5]">{person.role}</p>
            {person.specialization && (
              <p className="mt-4 text-sm text-[#526078]">{person.specialization}</p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {person.email && (
                <a href={`mailto:${person.email}`} className="rounded-md bg-[#078bc5] px-4 py-2 text-white">Email</a>
              )}

              {person.linkedin && (
                <a href={person.linkedin} target="_blank" rel="noreferrer" className="rounded-md border px-4 py-2">LinkedIn</a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default PersonProfile

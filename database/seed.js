import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async () => {
  const categories = [
    {
      name: 'Feedback & Information',
      slug: 'feedback-and-information',
      forums: ['-KpOx5Y4AqRr3sB4Ybwj', '-KsjO4_W3W9Q2Z2UmuPr']
    }
  ]
  await supabase.from('categories').insert(categories)

  const users = [
    {
      avatar: 'https://avatars3.githubusercontent.com/u/2327556?v=4&s=460',
      email: 'chrisvfritz@gmail.com',
      last_visit_at: 1504772078,
      name: 'Chris Fritz',
      registered_at: 1504632260,
      username: 'chrisvfritz',
      usernameLower: 'chrisvfritz',
      id: '38St7Q8Zi2N1SPa5ahzssq9kbyp1'
    }
  ]
  await supabase.from('users').insert(users)
}

await seedProjects()

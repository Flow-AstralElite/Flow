export type Project = {
  slug: string
  name: string
  image: string
  tags?: string[]
  markdownFile: string  // Path to markdown file
}

export const projects: Project[] = [
  {
    slug: 'openvpn-access-server',
    name: 'OpenVPN  Server Setup (Docker)',
    image: '/image/openvpn.jpeg',
    tags: ['vpn', 'docker', 'debian'],
    markdownFile: 'openvpn-access-server.md',
  },
]




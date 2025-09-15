export type Project = {
  slug: string
  name: string
  image: string
  tags?: string[]
  markdown: string
}

// (intentionally empty demo guide removed)

export const projects: Project[] = [


  {
    slug: 'openvpn-access-server',
    name: 'OpenVPN  Server Setup (Docker)',
    image: '/image/openvpn.jpeg',
    tags: ['vpn', 'docker', 'debian'],
    markdown: `# Easiest way to setup OpenVPN Access Server (Docker)

Prefer Debian-based OS (Ubuntu/Debian). Requires Docker.

## 1) Install Docker (Snap method)

\`\`\`bash
sudo snap install docker
\`\`\`

Alternatively install Docker Engine using apt if Snap isn't available.

## 2) Pull the Access Server image

\`\`\`bash
docker pull openvpn/openvpn-as
\`\`\`

## 3) Open ports on VM and router

- 9443 → Admin UI (container 943)
- 4443 → Client UI (container 443)
- 1195/udp → VPN data channel (you can switch to TCP if needed)

## 4) Run the container

\`\`\`bash
docker run -d \
  --name=openvpn-as-local \
  --device /dev/net/tun \
  --cap-add=MKNOD \
  --cap-add=NET_ADMIN \
  -p 9443:943 \
  -p 4443:443 \
  -p 1195:1195/udp \
  -v \${HOME}/openvpn-data:/openvpn \
  --restart=unless-stopped \
  openvpn/openvpn-as
\`\`\`

## 5) Get the auto-generated admin password

Username is \`openvpn\`.

\`\`\`bash
docker logs openvpn-as-local | grep "Auto-generated pass"
\`\`\`

## 6) Log in to the Admin UI

Open: \`https://PUBLIC_IP:9443/admin/\`

Then create users and download client profiles from the Client UI at \`https://PUBLIC_IP:4443\`.

> Tip: Use a static public IP or configure dynamic DNS. Persist data is stored in \`\${HOME}/openvpn-data\`.
`,
  },

  {
    slug: 'bytebot-easy-setup',
    name: 'Bytebot Easy setup',
    image: '/image/bytebot.png',
    tags: ['bytebot', 'bash', 'setup'],
    markdown: `# Bytebot Easy setup

Run the following commands on your server or local machine to quickly install Bytebot via the guided setup script:

### use wsl in window and make sure docker running..
\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/Myself-Ayush/bytebot-guided-setup/main/setup.sh -o setup.sh
chmod +x setup.sh
./setup.sh
\`\`\`

> Note: Review scripts before running them. The installer will guide you through required steps.
`,
  },
]



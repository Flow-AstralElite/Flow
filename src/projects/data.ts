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

## 0) Install Docker (Debian)
\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/AstralElite-open-source/docker/main/docker.sh | sudo bash
\`\`\`

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

- 9443 → Admin UI  and login user
- 1194/udp → VPN data channel (you can switch to TCP if needed)

## 4) Run the container

\`\`\`bash
docker run -d \
  --name=openvpn-as-local \
  --device /dev/net/tun \
  --cap-add=MKNOD \
  --cap-add=NET_ADMIN \
  -p 9443:943 \
  -p 4443:443 \
  -p 1194:1194/udp \
  -v \${HOME}/openvpn-data:/openvpn \
  --restart=unless-stopped \
  openvpn/openvpn-as
\`\`\`

## 5) Get the auto-generated admin password

Username is \`openvpn\`.

\`\`\`bash
docker logs openvpn-as-local | grep "Auto-generated pass"
\`\`\`

## 6) Configure the server's public IP address

Set the server's public IP address and reload the configuration:

\`\`\`bash
# This first command tells the OpenVPN server its public IP address
docker exec openvpn-as-local /usr/local/openvpn_as/scripts/sacli --key "host.name" --value "public-ip" ConfigPut

# This second command reloads the server to apply the change
docker exec openvpn-as-local /usr/local/openvpn_as/scripts/sacli start
\`\`\`

> Replace \`public-ip\` with your actual public IP address.

## 7) Log in to the Admin UI

Open: \`https://PUBLIC_IP:9443/admin/\`

Then create users and download client profiles from the Client UI at \`https://PUBLIC_IP:9443\`.

> Tip: Use a static public IP or configure dynamic DNS. Persist data is stored in \`\${HOME}/openvpn-data\`.
`,
  },
]



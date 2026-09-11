export type CommunityChannel = {
  kind: 'community' | 'broadcast' | 'podcast' | 'live' | 'mentorship' | 'merch'
  title: string
  description: string
}

// From "Building a Learning Community: TarunSpeaks & Be Limitless" on tarunmakhija.in.
export const communityChannels: CommunityChannel[] = [
  { kind: 'community', title: 'Be Limitless Community', description: '4 active WhatsApp groups for networking & learning.' },
  { kind: 'podcast', title: 'BE LIMITLESS with Tarun Makhija', description: 'A podcast sharing insights on marketing, personal branding & success strategies.' },
  { kind: 'live', title: '#TarunKeSaath', description: 'An Instagram Live show with industry experts & business leaders.' },
  { kind: 'broadcast', title: 'Be Limitless on Instagram', description: 'A broadcast channel sharing insights, updates and motivation.' },
  { kind: 'mentorship', title: 'Topmate.io Community', description: 'One-on-one mentorship for aspiring marketers and entrepreneurs.' },
  { kind: 'merch', title: '#TarunSpeaks Merchandise', description: 'A line representing a commitment to empowering individuals through education.' },
]

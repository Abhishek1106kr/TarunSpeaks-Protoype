// Turn the preview notice off at launch by setting show to false.
export const previewNotice = {
  show: true,
  message: 'Preview: we are still testing this site. Full launch soon.',
}

// Diwali theme. Active only between these instants; pages load in the normal theme after endsAt, with no redeploy.
// 32 hours from 8 Nov 2026, 1:25 pm IST.
export const festiveTheme = {
  name: 'diwali',
  startsAt: '2026-11-08T13:25:00+05:30',
  endsAt: '2026-11-09T21:25:00+05:30',
  greeting: 'Happy Diwali from TarunSpeaks',
}

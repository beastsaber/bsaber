import { redirect } from '@sveltejs/kit'

export const load = () => {
  throw redirect(301, '/playlists/bsmg-5th-anniversary')
}

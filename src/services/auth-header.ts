export default function authHeader() {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser || '');
  if (user && user.accessToken) {
    return { Authorization: `Bearer ${user.accessToken}` };
  }
  return {};
}

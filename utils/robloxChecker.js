import fetch from 'node-fetch';

export async function ownsShirt(username, shirtId) {
  const userRes = await fetch(`https://users.roblox.com/v1/usernames/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usernames: [username], excludeBannedUsers: true })
  });

  const userData = await userRes.json();
  const user = userData.data[0];
  if (!user) return false;

  const inventoryRes = await fetch(`https://inventory.roblox.com/v1/users/${user.id}/items/Asset/${shirtId}`);
  const data = await inventoryRes.json();
  return data.data.length > 0;
}

type Member = {
  name?: string;
  surename?: string;
  job_role?: string;
  email?: string;
  organization?: string | null;
};

function getMemberMDTemplate(member: Member) {
  const title = `**${member.name} ${member.surename}**`;
  const fields = [member.job_role, member.email, member.organization]
    .filter(Boolean)
    .join(', ');

  return `- ${title}
  ${fields}`;
}

async function updateMembers(members: Member[]) {
  const url =
    'https://api.slite.com/v1/notes/7M7inSaES4GBbj/tiles/33ef503e-e082-40cf-bd79-4f37f8f76024';
  const res = await fetch(url, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      accept: 'application/json',
      'x-slite-api-key': process.env.SLITE_API_KEY!
    }),
    credentials: 'same-origin',
    body: JSON.stringify({
      title: 'Členovia SUXA',
      url: 'https://suxa-platform.vercel.app/',
      content: members.map((member) => getMemberMDTemplate(member)).join('\\')
    })
  });

  if (!res.ok) {
    console.log('Error in updateMembers', { url, res });

    throw Error(res.statusText);
  }

  console.log('Slite members note updated');

  return res.json();
}

export { updateMembers };

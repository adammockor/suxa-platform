import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailWelcome({
  name,
  endPeriod,
  email
}: {
  name?: string | null;
  endPeriod: string;
  email: string;
}) {
  console.log('Sending welcome email');
  try {
    await resend.emails.send({
      from: 'SUXA <hello@suxa.sk>',
      to: [email],
      subject: 'Vitaj v SUXA!',
      react: EmailTemplateWelcome({ name, endPeriod })
    });
  } catch (error) {
    // just log, do not throw - it's ok if email is not delivered
    console.log(error);
  }
}

export const EmailTemplateWelcome = ({
  name,
  endPeriod
}: {
  name?: string | null;
  endPeriod: string;
}) => (
  <div>
    {name ? <h1>Vitaj v SUXA, {name}!</h1> : <h1>Vitaj v SUXA!</h1>}
    <p>
      Ďakujeme 💙 <br /> Ročný členský príspevok máš uhradený do {endPeriod} a
      si plnohodnotným členom SUXA.
    </p>
    <h2>Čo ďalej?</h2>
    <ul>
      <li>
        💬{' '}
        <a
          href="https://join.slack.com/t/suxa/shared_invite/zt-cic8y6s3-0FI98I0jdc3RajDSPW~E~w"
          target="_blank"
        >
          Prihlás sa do Slacku
        </a>{' '}
        a začni debatovať so SUXA komunitou.
        <br />
        <span style={{ fontStyle: 'italic' }}>
          Tip: používaj svoje celé meno, aby sme sa ľahšie spoznali.
        </span>
      </li>
      <li>
        👀 Pozri sa kto ďalší je v SUXA v{' '}
        <a href="https://clenske.suxa.sk">zozname členov</a>.
      </li>
      <li>
        📃 Prečítaj si o tom, aké ďalšie služby komunite SUXA poskytuje na{' '}
        <a
          href="https://slite.com/organization/join-link/suxa/wvOqjzvVCrq9TnWcsfJyQZ/default"
          target="_blank"
        >
          našom Slite
        </a>
        .
      </li>
    </ul>
    <h2>Čo sme spravili automaticky?</h2>
    <ul>
      <li>Poslali sme ti tieto informácie priamo do e-mailu.</li>
      <li>Pridali sme ťa do zoznamu členov.</li>
      <li>
        Prihlásili sme ťa do SUXA newslettera. Odhlásiť sa z neho môžeš pri
        najbližšom vydaní.
      </li>
    </ul>
    <p>
      Máš otázky?
      <br />
      Napíš @MatejOndrejka na Slacku.
    </p>
  </div>
);

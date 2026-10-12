import RegisterClient from './RegisterClient'

export const metadata = { title: 'Join Free — Best of PB San Diego' }

export default function RegisterPage({ searchParams }: { searchParams: { type?: string; plan?: string; tier?: string; code?: string } }) {
  return (
    <RegisterClient
      initialType={searchParams.type === 'business' ? 'business' : searchParams.type === 'member' ? 'member' : null}
      plan={searchParams.plan ?? ''}
      tier={searchParams.tier ?? ''}
      code={searchParams.code ?? ''}
    />
  )
}

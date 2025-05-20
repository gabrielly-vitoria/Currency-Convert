import '../src/styles/global.scss';
import CurrencyConverter from '@/src/components/main-page/Currency-Converter'


export const metadata = {
  title: 'Currency Converter',
  description: 'Currency converter made with Next.js and TypeScript, using Axios for API requests and SCSS for website styling.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head></head>
        <body>
            <CurrencyConverter />
            {children}
        </body>
    </html>
  );
}

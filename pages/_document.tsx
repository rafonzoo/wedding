import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html lang='id' className='antialiased'>
      <Head />
      <body className='font-inter text-def'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document

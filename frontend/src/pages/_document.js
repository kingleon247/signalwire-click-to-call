import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />

                    {/*<link*/}
                    {/*    href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"*/}
                    {/*    rel="stylesheet"*/}
                    {/*/>*/}
                </Head>
                <body className="antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument

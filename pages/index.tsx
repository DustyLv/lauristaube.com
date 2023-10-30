import { NextSeo } from 'next-seo'
import Layout from '../components/Layout'
import { sanity, urlFor } from '../client'
import { PortableText } from '@portabletext/react'
import { Page } from '../types'
import groq from 'groq'
import { GetStaticProps } from 'next'

const Home = ({ page }: { page: Page }) => {
  return (
    <Layout h1={page.heroTextOne} h2={page.heroTextTwo}>
      <NextSeo
        title={page.seoTitle}
        description={page.seoDescription}
        canonical="https://kailoon.com/"
        openGraph={{
          url: 'https://kailoon.com/',
          title: page.seoTitle,
          description: page.seoDescription,
          images: [
            {
              url: page.seoImage && urlFor(page.seoImage).width(1200).url(),
              width: 800,
              height: 600,
              alt: page.seoTitle,
              type: 'image/jpeg',
            },
          ],
          site_name: 'kailoon.com',
        }}
        twitter={{
          handle: '@kailoon', //twitter:creator
          site: '@kailoon', //twitter:site
          cardType: 'summary_large_image', //twitter:card
        }}
      />
      <article className="animate-fade">
        <PortableText value={page.body} />
      </article>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const page = await sanity.fetch(
    groq`
  *[_type == "page" && slug.current == $slug][0]{
  title,
  body,
  heroTextOne,
  heroTextTwo,
  seoTitle,
  seoDescription,
  seoImage,
  seoKeywords,
}`,
    { slug: 'home' }
  )

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
    revalidate: 60,
  }
}

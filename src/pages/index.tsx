import React, { FC } from "react";
import { graphql, Link, PageProps } from "gatsby";

interface IndexProps extends PageProps {
  data: {
    blog: {
      posts: Post[]
    }
  }
}

interface Post {
  fields: {
    slug: string;
  }
  frontmatter: {
    date: Date;
    title: string;
    author: string;
  }
  excerpt: string;
  id: string;
}

type Props = IndexProps;

export const pageQuery = graphql`
  {
    blog: allMarkdownRemark {
      posts: nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "Do MMMM YYYY")
          title
          author
        }
        excerpt
        id
      }
    }
  }
`;


const Index: FC<Props> = ({ data }) => (
  <>
    <div className="bg-gray-light dark:bg-gray-dark lg:py-32 p-8">
      <div className="container mx-auto">
        <h1 className="lg:text-6xl text-4xl font-bold">Developer / Software Engineer</h1>
        <h3 className="lg:text-4xl text-2xl font-semibold">Hey, I'm Joshua.</h3>
        <p className="lg:text-3xl text-lg">I'm a Belfast-based developer, currently working at <a href="https://instil.co/" rel="nofollow">Instil</a>.</p>
        <p className="lg:text-3xl text-lg">Previously worked with <a href="https://www.deloittedigital.co.uk/" rel="nofollow">Deloitte Digital</a> in the Gasworks &amp; <a href="https://www.surfsidesolutions.com/" rel="nofollow">Surfside Solutions</a> down in Annalong.</p>
        <div className="lg:text-2xl text-lg pt-6">
          <a className="pr-6" href="https://www.github.com/joshwjb" rel="nofollow">GitHub</a>
          <a href="https://uk.linkedin.com/in/joshu" rel="nofollow">LinkedIn</a>
        </div>
      </div>
    </div>
    <div className="lg:py-32 p-8 bg-white dark:bg-black">
      <div className="container mx-auto">
        <h2 className="lg:text-5xl text-3xl font-semibold">Blog Posts</h2>
        {
          data.blog.posts.map(post => (
            <article key={post.id}>
              <Link to={post.fields.slug}>
                <h3 className="lg:text-3xl text-xl">{post.frontmatter.title}</h3>
              </Link>
              <span className="lg:text-lg text-base">{post.frontmatter.date}</span>
              <p className="lg:text-xl text-lg py-2">{post.excerpt}</p>
            </article>
          ))
        }
      </div>
    </div>
  </>
);

export default Index;

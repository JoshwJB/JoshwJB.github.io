import React, { FC } from "react"
import { graphql, Link, PageProps } from "gatsby"

interface BlogPost extends PageProps {
  data: {
    markdownRemark: {
      frontmatter: {
        date: string;
        title: string;
      }
      html: string;
    }
  }
}

type Props = BlogPost;

export const query = graphql`
  query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY")
      }
    }
  }
`

const BlogPost: FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <>
      <Link to="/">
        <div className="bg-gray-light dark:bg-gray-dark p-8 lg:text-2xl text-xl">
          &lt;- Back
        </div>
      </Link>
      <div className="lg:py-32 p-8 bg-white dark:bg-black">
        <div className="container mx-auto">
          <h1 className="lg:text-5xl text-3xl">{data.markdownRemark.frontmatter.title}</h1>
          <p className="lg:text-3xl text-xl">{data.markdownRemark.frontmatter.date}</p>
          <div className="post lg:text-xl text-lg" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </div>
      </div>
    </>
  )
}

export default BlogPost;

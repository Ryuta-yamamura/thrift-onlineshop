import { request, gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
// new endpoint
const graphQLClient = new GraphQLClient(
	graphqlAPI // here add your endpoint
);

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					cursor
					node {
						author {
							bio
							id
							name
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;
	const result = await graphQLClient.request(query);

	return result.postsConnection.edges;
};

export const getProducts = async () => {
	const query = gql`
		query MyQuery {
			productsConnection {
				edges {
					node {
						id
						price
						slug
						updatedAt
						itemCategory {
							name
							slug
						}
						title
						featuredImage {
							url
						}
						description
					}
				}
			}
		}
	`;
	const result = await graphQLClient.request(query);
	return result.productsConnection.edges;
};

export const getPostDetails = async (slug) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				title
				excerpt
				featuredImage {
					url
				}
				author {
					bio
					name
					photo {
						url
					}
				}
				createdAt
				slug
				content {
					raw
				}

				categories {
					name
					slug
				}

				products {
					id
					price
					slug
					title
					rates {
						rate
						id
					}
					itemCategory {
						name
						slug
					}
					featuredImage {
						url
						createdAt
					}
					description
				}
			}
		}
	`;
	const result = await graphQLClient.request(query, { slug });

	return result.post;
};

export const getRecentPosts = async () => {
	const query = gql`
	query GetRecentPosts() {
		posts(
			orderBy: createdAt_ASC
			last:3
		) {
			title
			featuredImage {
				url
			}
			createdAt
			slug
		}
	}
	`;
	const result = await graphQLClient.request(query);

	return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetSimilarPosts($slug: String!, $categories: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;
	const result = await graphQLClient.request(query, { slug, categories });

	return result.posts;
};

export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result = await graphQLClient.request(query);

	return result.categories;
};

export const getItemCategories = async () => {
	const query = gql`
		query GetItemCategories {
			itemCategories {
				name
				slug
			}
		}
	`;

	const result = await graphQLClient.request(query);

	return result.itemCategories;
};

export const submitComment = async (obj) => {
	const result = await fetch(`/api/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	});
	return result.json();
};

export const getComments = async (slug) => {
	const query = gql`
		query GetComments($slug: String!) {
			comments(where: { post: { slug: $slug } }) {
				name
				createdAt
				comment
			}
		}
	`;

	const result = await graphQLClient.request(query, { slug });

	return result.comments;
};
export const getAdjacentPosts = async (createdAt, slug) => {
	const query = gql`
		query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
			next: posts(
				first: 1
				orderBy: createdAt_ASC
				where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
			previous: posts(
				first: 1
				orderBy: createdAt_DESC
				where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result = await graphQLClient.request(query, { slug, createdAt });

	return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
	const query = gql`
		query GetCategoryPost($slug: String!) {
			postsConnection(where: { categories_some: { slug: $slug } }) {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	const result = await graphQLClient.request(query, { slug });

	return result.postsConnection.edges;
};

export const getCategoryProduct = async (slug) => {
	const query = gql`
		query GetCategoryProduct($slug: String!) {
			productsConnection(where: { itemCategory: { slug: $slug } }) {
				edges {
					cursor
					node {
						id
						price
						createdAt
						description
						slug
						itemCategory {
							slug
							name
						}
						title
						featuredImage {
							url
						}
						rates {
							rate
							id
						}
					}
				}
			}
		}
	`;

	const result = await graphQLClient.request(query, { slug });

	return result.productsConnection.edges;
};

export const getFeaturedPosts = async () => {
	const query = gql`
	  query GetFeaturedPosts() {
		posts(where: {featuredPost: true}) {
		  author {
			name
			photo {
			  url
			}
		  }
		  featuredImage {
			url
		  }
		  title
		  slug
		  createdAt
		}
	  }   
	`;

	const result = await graphQLClient.request(query);

	return result.posts;
};

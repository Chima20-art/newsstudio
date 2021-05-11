export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "timeToRead",
      title: "Time to read",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },

    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          title: "Rich Text Block",
          name: "richTextBlock",
          type: "object",
          fields: [
            {
              title: "Rich Text",
              name: "richText",
              type: "blockContent",
            },
          ],
        },
        {
          title: "Quote",
          name: "quote",
          type: "quoteBlock",
        },
        {
          title: "Image",
          name: "image",
          type: "imageBlock",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};

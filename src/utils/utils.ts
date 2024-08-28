// Utility function convert kebab-case HTML attributes to camelCase. For ex, data-attribute-name -> dataAttributeName
export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

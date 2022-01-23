const siteUrl = "https://readsomnia.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/test/*"],
  robotsTxtOptions: {
    policies: [
      {userAgent: "*", disallow: "/test/*"},
      {userAgent: "*", allow: "/"},
    ],
  },
};
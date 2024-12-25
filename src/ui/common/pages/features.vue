<script setup lang="ts">
const features = ref([
  {
    title: "Effortless Authentication Integration",
    description:
      "Simplify user sign-in with built-in support for Google Identity, Supabase, and custom auth solutions. Comes with a ready-to-use UI for login, registration, and password management, ensuring secure and smooth authentication.",
  },
  {
    title: "Seamless Payment Processing",
    description:
      "Get paid faster with pre-configured Stripe and Lemon Squeezy integrations. Includes customizable payment forms and subscription handling, making transactions hassle-free for both you and your users.",
  },
  {
    title: "Smart Storage Solutions",
    description:
      "Manage user data efficiently with versatile storage utilities. Support for local, sync, and cloud storage ensures you can handle preferences, sessions, and more with ease and reliability.",
  },
  {
    title: "Styled UI Components",
    description:
      'Enhance your extension"s look with pre-configured UI libraries like Tailwind CSS and Vue components. Quickly build beautiful, responsive interfaces without starting from scratch.',
  },
  {
    title: "Ready-Made Essential Pages",
    description:
      'Hit the ground running with pre-built "Help", "About", "Privacy Policy", and "Terms of Service" pages. Easily customizable to fit your extension"s branding and requirements.',
  },
  {
    title: "Script Templates for All Scenarios",
    description:
      "Kickstart development with examples for background scripts, content scripts, and options pages. These templates provide a solid foundation to add custom features and logic quickly.",
  },
  {
    title: "Cross-Browser Compatibility",
    description:
      'Expand your extension"s reach with out-of-the-box support for Chrome, Firefox, and Edge. Write once, run anywhere to maximize your audience.',
  },
  {
    title: "Dynamic Theming and Customization",
    description:
      "Tailor the extension’s look and feel to your brand effortlessly. Built-in theming options allow for quick visual customizations to match your unique style.",
  },
  {
    title: "Global Ready: Localization Support",
    description:
      "Grow your user base worldwide with built-in internationalization (i18n) support. Easily translate your extension into multiple languages for broader market appeal.",
  },
  {
    title: "Robust Error Tracking and Logging",
    description:
      "Keep your extension running smoothly with integrated error handling and logging. Quickly capture, report, and resolve issues, making debugging a breeze.",
  },
  {
    title: "API-Ready Architecture",
    description:
      "Easily connect to external services with pre-configured API integration support. Utilize tools like Axios for efficient communication with third-party APIs.",
  },
  {
    title: "Instant Feedback: Hot Reloading",
    description:
      "Speed up development with hot reloading and integrated developer tools. See changes in real-time and debug faster, boosting productivity.",
  },
  {
    title: "Performance-Optimized Design",
    description:
      "Built for speed with features like lazy loading and efficient resource management. Keep your extension lightweight and fast, even as functionality grows.",
  },
  {
    title: "Scalable, Modular Codebase",
    description:
      "Future-proof your extension with a modular architecture. Easily add new features and scale your extension without worrying about breaking existing functionality.",
  },
])
</script>

<template>
  <div>
    <RouterLinkUp />

    <h1>Features</h1>
    <p>All available features</p>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="{ title, description } in features"
        :key="title"
        class="card card-compact bg-primary text-primary-content shadow-md"
      >
        <div class="card-body">
          <span class="card-title text-sm font-bold">{{ title }}</span>
          <p>
            {{ description }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <h2>And a Lot More!</h2>
      <p>
        Beyond the core features, this boilerplate includes advanced utilities
        and enhancements that further simplify development:
      </p>
      <ul>
        <li>
          <strong>Built-In Analytics Setup:</strong>
          Integrate with popular analytics tools to track user behavior and
          extension performance effortlessly.
        </li>
        <li>
          <strong>Notification and Alert System:</strong>
          Easily notify users with custom alerts and notifications, enhancing
          user engagement and interaction.
        </li>
        <li>
          <strong>Accessibility Ready:</strong>
          Ensure your extension is accessible to all users with built-in support
          for accessibility standards and best practices.
        </li>
        <li>
          <strong>Responsive Design:</strong>
          Adapt your extension UI to different screen sizes with ease, providing
          a consistent user experience across devices.
        </li>
        <li>
          <strong>Extensive Documentation and Examples:</strong>
          Well-documented code and comprehensive examples make it easy to
          understand and extend the boilerplate's functionality.
        </li>
        <li>
          <strong>Continuous Updates and Community Support:</strong>
          Regular updates and an active community ensure that your boilerplate
          stays relevant and up-to-date with the latest technologies and
          standards.
        </li>
      </ul>
    </div>

    <div class="flex justify-center">
      <RouterLink
        to="/common/account/login"
        class="btn btn-secondary btn-xl w-full md:max-w-96"
      >
        Get Started Now
      </RouterLink>
    </div>
  </div>
</template>

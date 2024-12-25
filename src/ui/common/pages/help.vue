<template>
  <div>
    <RouterLinkUp />

    <h1>Help & Support</h1>
    <p>
      Need assistance? We are here to help! For any issues or questions, you can
      contact our support team at:
      <a
        href="mailto:support@example.com"
        class="btn-link"
      >
        support@example.com
      </a>
    </p>

    <p class="text-sm font-thin">
      We strive to respond to all inquiries within 24 hours. Thank you for your
      patience and understanding.
    </p>

    <div class="flex gap-2">
      <RouterLink
        to="/common/about"
        class="btn btn-primary"
      >
        About Us
      </RouterLink>

      <RouterLink
        to="/common/privacy-policy"
        class="btn btn-primary"
      >
        Privacy Policy
      </RouterLink>

      <RouterLink
        to="/common/terms-of-service"
        class="btn btn-primary"
      >
        Terms
      </RouterLink>
    </div>
  </div>
</template>

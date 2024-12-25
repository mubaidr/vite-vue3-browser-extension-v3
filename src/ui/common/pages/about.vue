<template>
  <div>
    <RouterLinkUp />

    <h1>About Us</h1>

    <p>
      Welcome to our platform! We are dedicated to providing the best service to
      our users. Our mission is to deliver high-quality products and exceptional
      customer support.
    </p>

    <p>Thank you for choosing us. We look forward to serving you!</p>

    <div class="flex gap-2">
      <RouterLink
        to="/common/change-log"
        class="btn btn-primary"
      >
        Change Log
      </RouterLink>

      <RouterLink
        to="/common/help"
        class="btn btn-primary"
      >
        Help
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

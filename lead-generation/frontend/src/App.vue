<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">LeadGen</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lead-form">Lead Form</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About Us</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <main class="container mt-3">
      <router-view></router-view>
    </main>
    <footer class="bg-light text-center py-3 mt-4">
      <p>&copy; Company Name {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    toggleNavbar() {
      const navbar = document.getElementById('navbarNav');
      if (navbar) {
        navbar.classList.toggle('show');
      }
    }
  }
}
</script>

<style>
body {
  padding-top: 56px;
}
</style>

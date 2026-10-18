<template>
  <nav id="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/authors">Authors</router-link></li>
      <li><router-link to="/words">Words</router-link></li>
      <li><router-link to="/preverbs">Proverbs</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
#navbar {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background: #f8f9fa;
  border-bottom: 1px solid #e5e5e5;
}

#navbar ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

#navbar li {
  padding: 0.5rem 0.75rem;
}

#navbar a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

#navbar a:hover,
#navbar .router-link-active {
  color: #007bff;
}

@media (max-width: 767px) {
  #navbar {
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    padding: 0 0 1rem;
  }
  
  #navbar ul {
    gap: 0.5rem;
  }
}
</style>

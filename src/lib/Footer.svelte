<footer>
  <hr />
  <div class="footer-content">
    <div>
      <a href="https://bsaber.com">
        <img class="logo" alt="BeastSaber" src="/BeastSaber-LogoW.webp" /></a
      >
    </div>
    <div class="links">
      <p>
        <a class="btn" href="https://discord.gg/VJZHUbt" target="_blank">Discord</a> <br />
        <a class="btn" href="https://www.patreon.com/user/membership?u=119426555" target="_blank"
          >Support Us</a
        > <br />
        <a class="btn" href="https://www.bsaber.com" target="_blank">Privacy Policy</a> <br />
        <a class="btn" href="https://www.bsaber.com" target="_blank">Chaeyoung</a> <br />
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @import 'src/scss/variables';
  footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .footer-content {
    position: relative;
    text-align: center;
    padding: 1.5rem 0 1.5rem 0;
  }

  hr {
    width: 40%;
    margin: 0 auto;
    filter: brightness(45%);
  }

  .links {
    margin: 0.5rem;
  }

  .btn {
    color: white;
    font-family: $font-poppins;
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .logo {
    height: 30px;
  }
</style>

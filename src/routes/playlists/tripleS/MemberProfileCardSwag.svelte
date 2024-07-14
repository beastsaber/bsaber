<script lang="ts">
  export let date: string
  export let image: string
  export let name: string
  export let sNumber: number
</script>

<div
  class="member-box"
  style={`background: url(${image}); background-size: 15rem 20rem; background-repeat: no-repeat; background-position: center;`}
>
  <div class="name">S{sNumber} {name}</div>
  <div class="date">{date}</div>
</div>

<style lang="scss">
  div.member-box {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    height: 20rem;
    width: 15rem;
    justify-content: end;
  }

  h2 {
    font-size: 1.5rem;
  }

  .date,
  .name {
    color: white;
    background-color: rgba(0, 0, 0, 1);
    text-align: center;
    // margin: 0 auto;
    padding: 0.2rem 1rem;
    font-size: 1.4rem;
  }

  .date {
    // margin-top: 0.5rem;
    // border-radius: 5px 5px 0 0;
    margin: 0 auto;
    transform: translateX(-6rem) translateY(1rem) rotateZ(10deg);
    // gold
    color: #ffd700;
  }

  .name {
    margin: 0 auto;
    transform: translateX(6rem) translateY(3rem) rotateZ(-14deg);
    border-radius: 5px;
    // margin-bottom: 0.5rem;
  }
</style>

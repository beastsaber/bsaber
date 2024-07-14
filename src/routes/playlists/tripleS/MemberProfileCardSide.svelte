<script lang="ts">
  export let date: string
  export let image: string
  export let name: string
</script>

<div
  class="member-box"
  style={`background: url(${image}); background-size: 15rem 20rem; background-repeat: no-repeat; background-position: center;`}
>
  <!-- <div class="date">{date}</div> -->
  <div class="name">{name}</div>
</div>

<style lang="scss">
  div.member-box {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    height: 20rem;
    width: 15rem;
    justify-content: space-between;
  }

  h2 {
    font-size: 1.5rem;
  }

  .date,
  .name {
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
    text-align: center;
    // margin: 0 auto;
    padding: 0.2rem 1rem;
    font-size: 1.25rem;
  }

  .date {
    // margin-top: 0.5rem;
    border-radius: 5px 5px 0 0;
    margin-bottom: 0.5rem;
  }

  .name {
    margin: 0 auto;
    transform: rotateZ(90deg) translateY(-7.5rem) translateX(10rem) translateY(50%);
    border-radius: 0 0 5px 5px;
    // margin-bottom: 0.5rem;
  }
</style>

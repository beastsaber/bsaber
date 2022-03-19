<script lang="ts">
  let navbarDropdownItems: {
        name: string;
        show: boolean;
        Items: {
            name: string;
            href: string;
            dividerAfter?: boolean;
        }[];
    }[] = [
    {
      name: "Get Started",
      show: false,
      Items: [
        {
          name: "Test",
          href: "#"
        }
      ]
    },
    {
      name: "Find Maps",
      show: false,
      Items: [
        {
          name: "Test",
          href: "#"
        }
      ]
    },
    {
      name: "Playlists",
      show: false,
      Items: [
        {
          name: "Test",
          href: "#"
        }
      ]
    },
    {
      name: "News & Info",
      show: false,
      Items: [
        {
          name: "Test",
          href: "#"
        }
      ]
    },
    {
      name: "Community Hub",
      show: false,
      Items: [
        {
          name: "Test",
          href: "#"
        }
      ]
    },
    {
      name: "Help",
      show: false,
      Items: [
        {
          name: "BSMG Wiki",
          href: "https://bsmg.wiki"
        },
        {
          name: "BSMG Discord",
          href: "https://discord.gg/beatsabermods"
        },
        {
          name: "BeastSaber Discord",
          href: "https://discord.gg/VJZHUbt",
          dividerAfter: true
        },
        {
          name: "GitHub",
          href: "https://github.com/beastsaber/bsaber"
        }
      ]
    }
  ];

    // Function that toggles all other dropdown items to false
    function toggleDropdown(in_item: { name?: string; show: any; Items?: { name: string; href: string; dividerAfter?: boolean; }[]; }) {
      let tempArray = navbarDropdownItems; // Copy the array because svelte doesn't like to change arrays
      tempArray.forEach(function(item, index) {
        if (item !== in_item) {
          this[index].show = false;
        } else {
          this[index].show = !in_item.show;
          console.log(in_item);
          console.log(this[index].show);
        }
      }, tempArray);
      navbarDropdownItems = tempArray;
    }

    let showNavbarMobile = false;

    function toggleOff() {
      let tempArray = navbarDropdownItems;
      tempArray.forEach(function(item, index) {
          this[index].show = false;
      }, tempArray);
      navbarDropdownItems = tempArray;
    }
</script>

<nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
  <div class="container"><a href="/" class="navbar-brand" id="home-link"><img alt="BeatSaver" src="/static/BeastSaber-LogoW.webp" title="BeatSaver" height="23px"></a>
    <button type="button" class="navbar-toggler" id="navbar-button" on:click="{() => showNavbarMobile = !showNavbarMobile}" data-toggle="collapse" data-target="navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
    <div class="collapse navbar-collapse {showNavbarMobile ? 'show' : ''}" id="navbar">
      <ul class="navbar-nav me-auto">

        {#each navbarDropdownItems as item}
          <li class="nav-item dropdown">
            <!-- <a href="#" class="nav-link dropdown-toggle {item.show ? 'show' : ''}" on:mouseover="{() => toggleDropdown(item)}" on:mouseleave="{toggleOff}">{item.name}</a> -->
            <a href="#" class="nav-link dropdown-toggle {item.show ? 'show' : ''}" on:click="{() => toggleDropdown(item)}">{item.name}</a>
            <!-- svelte-ignore a11y-mouse-events-have-key-events -->
            <div class="dropdown-menu {item.show ? 'show' : ''}" on:mouseleave="{() => toggleOff()}">

              {#each item.Items as navItem}
                <a href="{navItem.href}" class="dropdown-item">{navItem.name}</a>
                {#if navItem.dividerAfter}
                  <div class="dropdown-divider"></div>
                {/if}
              {/each}

            </div>
          </li>
        {/each}

      </ul>
    </div>
  </div>
</nav>


<style>
</style>
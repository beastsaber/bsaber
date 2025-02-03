---
title: TotalBS - Interview with Chaimzy
section: articles
category: interview
publish: 2025-02-03T12:00:00.000Z
homepageText: 'Chaimzy, been around since the start of Beat Saber and made a map called "End Times" that was part of the Extra Sensory II event! They also helped in QA of the project as a whole. Check out this article to learn more about Chaimzy!'
image: /static/uploads/posts/exsii/totalbslogo.png
showInPostListing: true
---

[Go back to **"This is TotalBS"**](/posts/this-is-totalbs)

<div class="profile">
  <div class="image">
    <img class="avatar" id="avatar" alt="avatar" />
  </div>
  <div class="bio">
      <div class="name"><a href="https://beatsaver.com/profile/70911" id="name">Chaimzy</a></div>
      <div class="roles"><p id="roleString" /></div>
  <div class="description" id="description"></div>
  <hr class="break" />
  <div class="bottom-row">
  <div class="socials">
    <a href="https://x.com/ChaimzyLazuli"><svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg></a>
    <a href="https://discord.com/users/259701017883443200"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="25" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg></a>
    </div>
          <div class="badges">
        </div>
    </div>
  </div>
</div>

<script>
async function fetchUserData() {
  try {
    const response = await fetch('https://api.beatsaver.com/users/id/70911');
    if (!response.ok) throw new Error('Failed to fetch user data');

    const data = await response.json();

    document.getElementById('avatar').src = data.avatar || '';
    document.getElementById('avatar').alt = data.name || 'User Avatar';
    document.getElementById('name').textContent = data.name || 'Unknown User';
    document.getElementById('description').innerHTML = formatDescription(data.description || '');
    document.getElementById('roleString').textContent = getRoles(data);
    } catch (error) {
    console.error('Error fetching user data:', error);
    document.getElementById('roleString').textContent = 'Error loading roles';
    document.getElementById('description').textContent = 'Unable to load description.';
    }
  }

fetchUserData();
    
function getRoles(user) {
  const roles = [];

  if (user.admin) roles.push('Admin');
  if (user.seniorCurator) {
      roles.push('Senior Curator');
  } else if (user.curator) {
      roles.push('Curator');
  }
  if (user.verifiedMapper) {
      roles.push('Verified Mapper');
  } else if (user.stats?.totalMaps >= 1) {
      roles.push('Mapper');
  }
  return roles.join(', ');
}

function formatDescription(text) {
  return text
    .replace(/\n/g, '<br>') // Convert line breaks to <br>
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Convert **bold** to <strong> tags
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" style="color: white;">$1</a>') // Convert URLs to clickable links
    .replace(/(^|\s)@(\w+)/g, '$1<a href="https://beatsaver.com/profile/username/$2" target="_blank">@$2</a>'); // Convert @mentions to profile links
  }
</script>

<style>
  .profile {
    padding: 0.75rem;
    position: relative;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 3px 3px black;
    border-radius: 5px;
  }
  .profile::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('/uploads/posts/exsii/Main.00_00_58_23.Still029.png');
    background-position: center;
    background-size: cover;
    filter: brightness(50%);
    z-index: -1;
    border-radius: 5px;
  }

  .image {
    background-color: #00000080;
    border-radius: 5px 0 0 5px;
    padding: 10px 1rem 10px 10px;
  }
  .avatar {
    border-radius: 50%;
    width: 92px;
    height: auto;
  }

  .bio {
    border-radius: 0 5px 5px 0;
    background-color: #00000080;
    padding: 5px;
    width: 100%;
  }
    @media (max-width: 512px) {
    .image {
      display: none;
    }
    .bio {
      border-radius: 5px;
    }
  }
  .name {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 2.5rem;
    font-weight: bold;
    align-items: center;
    a {
      color: white;
    }
  }
  .roles p {
    color: #888;
    padding-left: 2px;
    margin-bottom: 2px;
  }
  .description {
    padding-left: 3px;
    margin-bottom: 10px;
    a {
      color: white;
    }
  }
  .break {
    border: none;
    height: 1px;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #999999 0%, rgba(153, 153, 153, 0) 100%);
  }
  .bottom-row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.25rem;
  }
  .socials {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    padding-left: 2px;
    a {
      transition: transform 0.3s ease;
    }
  }
  .socials a:hover {
    transform: scale(1.2);
  }
  .badges {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }
  .badges a:hover {
    color: white;
  }
  .beasties,
  .bl-ranked,
  .ss-ranked {
    align-items: end;
    display: flex;
    gap: 0.25rem;
    padding: 3px;
    border-width: 1.5px !important;
    border-style: solid !important;
    border-radius: 5px;
    & img {
      border-radius: unset;
    }
  }
  .beasties {
    background-color: #45408875;
    border: #454088;
  }
  .bl-ranked {
    background-color: #cf8afb55;
    border: #cf8afb85;
  }
  .ss-ranked {
    background-color: #ffde1a55;
    border: #ffde1a85;
  }
  .bsmg {
    background-color: #747bff55;
    border: #747bff85;
  }
</style>

<br />

It sometimes feels like not a lot of people can say they've been around since the start of Beat Saber and are still contributing towards creating new and exciting ways to change the game in ways we've never seen or expected!

Chaimzy has been around since the start and made a map called "End Times" that was part of the Extra Sensory II event! They also helped in QA of the project as a whole.

<hr />
<br />

# Interview with Chaimzy

### Q: Tell us who you are! Your name, how long you’ve been playing Beat Saber, what got you started playing, what got you started modding, hobbies, etc.

**A:** Hi! I'm Chaimzy! I've started playing Beat Saber the first week it released and have been playing ever since! I've always been a fan of modcharts across all rhythm games, especially "NotITG". When Extra Sensory first released, it was a mind-blowing experience for me. It was incredible to finally see proper modcharts in the Beat Saber community. After its release, I started playing _every single_ Noodle chart that came out for about the next year and a half. It's safe to say that I was obsessed.

### Q: Where else do you participate in the Custom Beat Saber Community? Mapping? Ranking? How long?

**A:** I used to just be a general ranked player with a love for modcharts of any kind on the side. I've never been really involved with any specific part of the community, keeping to myself and a few of my friends for the most part. At some point I ended up getting into mapping, and getting familiar with the fundamentals before I really started getting into modcharts of any sort.

### Q: When and why did you start coding?

**A:** I actually don't have all that much experience with programming. I took some classes during Middle/Highschool, but never had much reason to use any of what I had learned since then. [Swifter's Remapper](https://github.com/Swifter1243/ReMapper) is what actually got me started in learning to code for the sake of my hobbies. Then as I started working on End Times, I started learning HLSL (High-Level Shader Language) for the shaders that I needed in the map, Especially for the supernova, the sun, and Giants deep.

### Q: For you, what was the most interesting or exciting part behind Extra Sensory I (Noodle Extensions)? What is your favorite Noodle Extensions map?

**A:** Extra Sensory I was such a suprise to me, especially when all I heard was people in BSMG yelling to update my mods, and just play the maps (only ones out at that time was [At Doom's Gate](https://beatsaver.com/maps/cb19) and [Analys](https://beatsaver.com/maps/d00c)). Analys was an incredible experience for me playing it for the first time, I think I literally screamed in excitement when I realized that modcharts were now possible. After that, the note tornado at the end of [Doppelganger](https://beatsaver.com/maps/d53c) was such an exciting experience for me, I never thought any of this would be possible in Beat Saber. I'd say that as of now, while I can't pick an absolute favorite chart since I like so many of them for different reasons, my top few would have to be: [Paradigm](https://beatsaver.com/maps/3bbb0), [Superluminal](https://beatsaver.com/maps/358a7), [IX's Shadow](https://beatsaver.com/maps/33232), [As The World Caves In](https://beatsaver.com/maps/210e3), and [Heliov](https://beatsaver.com/maps/27ade).

!youtube[gokZx0QjqZQ]

### Q: What was your role in Extra Sensory II? Give us a deeper dive into how you became involved. Were there any struggles?

**A:** My involvement in Extra Sensory II was mostly with my map, End Times, and some general QA Testing. The biggest issues that I ran into throughout the process was just with End Times, the biggest issues being with the replay system that I did in it. It was a struggle to get working in the first place. I had to figure out a way to essentially "record" the players actions without any scripting and make it look like the replay system does in Outer Wilds. The way I eventually found was by taking advantage of a Unity quirk that made it so if I turned off a camera, the render texture that was attached to that camera would display the last frame that it saw, meaning that I had to use a different camera with a seperate render texture and material for _every single frame_ of the replay system. That ended up totaling up to 314 cameras used in the map. The second issue that I ran into was when it came to making the replay system work in stereoscopic 3d, which involved having two separate cameras each take a photo from two _slightly_ different view points, and then I would render the result of one to each eye, creating the 3D effect ingame.

### Q: For someone who doesn't know anything about coding, where and how do you recommend they get started? Do you have any role models in the community?

**A:** I actually started all of this with not much experience at all, so my best recommendation for getting started would be to adjust your scale towards something that you can reach, and then scale up as you learn more and more. I'd also recommend to make sure that what you are working on is something you're passionate about! It is so much easier to get started when you love what you are creating!

### Q: Is there anything else you’d like to share about the project?

**A:** The only thing that I'd like to say about this project is that while it was very stressful at times, it was also the most enjoyable and fulfilling thing that I have been a part of, so thank you to the rest of the TotalBS team for being some of the most incredible individuals I have ever met! (Shoutout especially to [Aeroluna](/posts/totalbs-interview-with-aeroluna) and [Swifter](/posts/totalbs-interview-with-swifter)!)

### Q: Is there anything else you'd like to share in general?

**A:** The last thing I would like to say is thank you to the community for being so kind and supportive about Extra Sensory II! And an even bigger thanks to everyone who reached out to me in DM's to say nice things about my work with End Times! I won't lie, I spent most of the day after the event in tears just watching all of the reactions from the vods and Youtube videos that so many people had uploaded. Thank you all so much!!!
<br />

---

**We'd like to thank Chaimzy for taking the time to answer our questions! Be sure to check out the interviews with the rest of the team!**
\
\*_This interview was lightly edited for spelling, grammar, formatting, and clarity._

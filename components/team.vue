<template>
  <div>
    <ascent-team-header
      :game="team.game"
      :flag="team.flag"
      :highlights="team.highlights"
    />
    <div class="flex flex-wrap justify-around">
      <ascent-player
        v-for="player in team.players"
        :id="player.name"
        :key="player.name"
        :player="player"
      />
    </div>
  </div>
</template>

<script>
import AscentPlayer from "~/components/player.vue"
import AscentTeamHeader from "~/components/team_header.vue"

export default {
  components: {
    AscentPlayer,
    AscentTeamHeader,
  },

  props: {
    team: {
      type: Object,
      default: null,
    },
  },
}
</script>

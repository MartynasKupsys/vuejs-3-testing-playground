<template>

    <CalendarComponent/>

    <!-- <template v-for="date in selectedDates" :key="date">
        <pre>
            <div>Locale: {{ new Date(date) }}</div>
            <div>UTC: {{ date }}</div>
            <div>Without Time: {{ new Date(date).toDateString() }}</div>
        </pre>

    </template> -->
</template>

<script>
import CalendarComponent from './components/CalendarComponent.vue';

export default {
    name: "App",
    components: { CalendarComponent },
    props: {},
}
</script>

<style lang="scss">

.container {
    width: 25%;
    display: flex;
    flex-direction: column;
    .container__frequency {
        padding: 0.5rem;
    }
    .container__selected {
        padding: 0.5rem;
    }
    .container__selected-data {
        font-weight: 600;
        font-size: 1.25rem;
    }
}

span {
    font-weight: 800;
}
</style>
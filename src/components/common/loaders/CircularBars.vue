<template>
    <div class="spinner flex justify-center items-center">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
    </div>
</template>
  
<script>

</script>
  
<style scoped>
div.spinner {
    position: relative;
    width: 25px;
    height: 25px;
    display: inline-block;
    margin-left: 50%;
    margin-right: 50%;
    padding: 10px;
    border-radius: 10px;
    animation: fade 2s linear infinite;
}

div.spinner div {
    @apply bg-content-secondary;
    width: 6%;
    height: 16%;
    position: absolute;

    /* transform-origin: */
    /* opacity: 0; */
    border-radius: 50px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
}

@keyframes fade {
    from {
        transform: rotate(0deg) translate(0, 0);
    }

    to {
        transform: rotate(360deg) translate(0, 0);
    }
}


div.spinner div.bar1 {
    transform: rotate(0deg) translate(0, -130%);
}

div.spinner div.bar2 {
    transform: rotate(45deg) translate(0, -130%);
}

div.spinner div.bar3 {
    transform: rotate(90deg) translate(0, -130%);
}



div.spinner div.bar4 {
    transform: rotate(135deg) translate(0, -130%);
}



div.spinner div.bar5 {
    transform: rotate(180deg) translate(0, -130%);
}

div.spinner div.bar6 {
    transform: rotate(225deg) translate(0, -130%);
}



div.spinner div.bar7 {
    transform: rotate(270deg) translate(0, -130%);
}

div.spinner div.bar8 {
    transform: rotate(315deg) translate(0, -130%);
}
</style>
  
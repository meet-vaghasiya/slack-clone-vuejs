<template>
    <div class="loader">
        <div class="spinner"></div>
    </div>
</template>
  
<style>
.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.spinner {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #555;
    border-radius: 50%;
    aspect-ratio: 1/1;
    min-height: 24px;
    height: 100%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
  
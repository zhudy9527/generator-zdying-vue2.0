<template>
    <div class="loading_box" @click.stop.prevent>
        <div class="next-loading-tip">
            <div class="next-loading-indicator">
                <div class="next-loading-fusion-reactor">
                    <span class="next-loading-dot"></span>
                    <span class="next-loading-dot"></span>
                    <span class="next-loading-dot"></span>
                    <span class="next-loading-dot"></span>
                </div>
            </div>
            <!-- <div class="next-loading-tip-content"></div> -->
            <!-- <div class="next-loading-tip-placeholder"></div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data () {
        return {
            description: 'loading',

        }
    },
}
</script>

<style scoped>
/* loading */
.loading_box {
    position: absolute;
    z-index: 99999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
}

.next-loading-tip {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 4;
    transform: translate(-50%, -50%);
    text-align: center;
}

.next-loading-fusion-reactor {
    display: inline-block;
    width: 48px;
    height: 48px;
    position: relative;
    margin: 0;
    animation-duration: 5.6s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: nextVectorRoute;
}

.next-loading-fusion-reactor .next-loading-dot:nth-child(1) {
    top: 0;
    bottom: 0;
    left: 0;
    animation-name: nextVectorDotsX;
}
.next-loading-fusion-reactor .next-loading-dot:nth-child(2) {
    left: 0;
    right: 0;
    top: 0;
    opacity: 0.8;
    animation-name: nextVectorDotsY;
}
.next-loading-fusion-reactor .next-loading-dot:nth-child(3) {
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0.6;
    animation-name: nextVectorDotsXR;
}
.next-loading-fusion-reactor .next-loading-dot:nth-child(4) {
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    animation-name: nextVectorDotsYR;
}
.next-loading-fusion-reactor .next-loading-dot {
    position: absolute;
    margin: auto;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #42a5f5;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-duration: 1.4s;
}

@keyframes nextVectorDotsX {
    25% {
        left: 0;
    }
    45%,
    50% {
        left: calc(48px / 2 - 12px * 1.2 / 2);
        width: calc(12px * 1.2);
        height: calc(12px * 1.2);
    }
    90% {
        left: 0;
        height: 12px;
        width: 12px;
    }
}
@keyframes nextVectorDotsY {
    25% {
        top: 0;
    }
    45%,
    50% {
        top: calc(48px / 2 - 12px * 1.2 / 2);
        height: calc(12px * 1.2);
        width: calc(12px * 1.2);
    }
    90% {
        top: 0;
        height: 12px;
        width: 12px;
    }
}
@keyframes nextVectorDotsXR {
    25% {
        right: 0;
    }
    45%,
    50% {
        right: calc(48px / 2 - 12px * 1.2 / 2);
        width: calc(12px * 1.2);
        height: calc(12px * 1.2);
    }

    90% {
        right: 0;
        height: 12px;
        width: 12px;
    }
}
@keyframes nextVectorDotsYR {
    25% {
        bottom: 0;
    }
    45%,
    50% {
        bottom: calc(48px / 2 - 12px * 1.2 / 2);
        height: calc(12px * 1.2);
        width: calc(12px * 1.2);
    }

    90% {
        bottom: 0;
        height: 12px;
        width: 12px;
    }
}

@keyframes nextVectorRoute {
    0% {
        transform: rotate(0deg);
    }
    5% {
        transform: rotate(90deg);
    }
    25% {
        transform: rotate(90deg);
    }
    30% {
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(180deg);
    }
    55% {
        transform: rotate(270deg);
    }
    75% {
        transform: rotate(270deg);
    }
    80% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
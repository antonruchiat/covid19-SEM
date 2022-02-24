function permut2CombinationRepetion(permutationOptions,
    permutationLength = permutationOptions.length) {

    if (permutationLength === 1) {
        return permutationOptions.map((permutationOption) => [permutationOption]);
    }

    // Init permutations array.
    const permutations = [];

    // Get smaller permutations.
    const smallerPermutations = permutateWithRepetitions(
        permutationOptions,
        permutationLength - 1
    );

    // Go through all options and join it to the smaller permutations.
    permutationOptions.forEach((currentOption) => {
        smallerPermutations.forEach((smallerPermutation) => {
            permutations.push([currentOption].concat(smallerPermutation));
        });
    });

    return permutations;
}

console.log(permut2CombinationRepetion(['1', '2', '2', '3'], 2));
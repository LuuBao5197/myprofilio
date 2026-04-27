async function loadGithubProjects() {
  const username = 'LuuBao5197';
  const container = document.getElementById('github-projects');
  if (!container) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=public`
    );
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      container.innerHTML = '<p class="col-span-3 text-center font-body text-grey-20">No public repositories found.</p>';
      return;
    }

    container.innerHTML = repos.map(repo => `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"
         class="block rounded border border-grey-60 p-6 shadow transition-colors duration-200 hover:bg-primary group">
        <div class="flex items-center gap-2 pb-2">
          <i class="bx bxl-github text-xl text-primary group-hover:text-yellow"></i>
          <h3 class="truncate font-header text-lg font-bold text-primary group-hover:text-yellow">
            ${repo.name}
          </h3>
        </div>
        <p class="min-h-[2.5rem] font-body text-sm text-grey-20 group-hover:text-white" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
          ${repo.description || 'No description provided.'}
        </p>
        <div class="flex items-center gap-4 pt-4">
          ${repo.language ? `<span class="rounded-full bg-lila px-3 py-1 font-body text-xs font-semibold text-primary group-hover:bg-white">${repo.language}</span>` : ''}
          <span class="font-body text-xs text-grey-40 group-hover:text-white">&#9733; ${repo.stargazers_count}</span>
          <span class="font-body text-xs text-grey-40 group-hover:text-white">&#9843; ${repo.forks_count}</span>
        </div>
      </a>
    `).join('');
  } catch (e) {
    if (container) {
      container.innerHTML = '<p class="col-span-3 text-center font-body text-grey-20">Could not load projects. <a href="https://github.com/LuuBao5197" target="_blank" class="text-primary underline">View on GitHub</a></p>';
    }
  }
}

loadGithubProjects();

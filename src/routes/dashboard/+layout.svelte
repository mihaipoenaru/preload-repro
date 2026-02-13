<script lang="ts">
    import Container from '$lib/components/custom/tags/Container.svelte';
    import {page} from '$app/state';
    import {
        Breadcrumb,
        BreadcrumbItem,
        BreadcrumbLink,
        BreadcrumbList,
        BreadcrumbSeparator
    } from '$lib/components/ui/breadcrumb/index';
    import {getInvoice} from '$lib/remotes/invoice.remote';
    import {getProperty} from '$lib/remotes/property.remote';
    import {Spinner} from '$lib/components/ui/spinner';
    import wcmatch from 'wildcard-match';
    import {generateInvoiceId} from '$lib/invoice-utils';

    let {children} = $props();

    const mergerFns: { glob: ReturnType<typeof wcmatch>; fn: () => Promise<string> }[] = [
        {glob: wcmatch('**/properties/*'), fn: propertyLabeler},
        {glob: wcmatch('**/properties/*/*'), fn: invoiceLabeler}
    ];

    const breadcrumbs = $derived.by(() => {
        const path = page.url.pathname + '/';
        let i = 0;
        const res: { label: string | Promise<string>; href: string | null }[] = [];

        while ((i = path.indexOf('/', i + 1)) >= 0) {
            const href = path.slice(0, i);
            const part = href.slice(href.lastIndexOf('/') + 1);

            const mergerFn = mergerFns.find((mf) => mf.glob(href))?.fn;
            if (mergerFn) {
                res.push({href, label: mergerFn()});
            } else {
                res.push({href, label: (part)});
            }
        }

        return res;
    });

    async function propertyLabeler() {
        return '...and then here';
    }

    async function invoiceLabeler() {
        return 'some_invoice';
    }
</script>

<Breadcrumb>
    <BreadcrumbList>
        {#each breadcrumbs as {href, label}, idx (href)}
            <BreadcrumbItem>
                <svelte:boundary>
                    <BreadcrumbLink {href}>
                        {await label}
                    </BreadcrumbLink>

                    {#snippet pending()}
                        <Spinner/>
                    {/snippet}
                    {#snippet failed()}
                        &lt;&lt;eroare&gt;&gt;
                    {/snippet}
                </svelte:boundary>
            </BreadcrumbItem>
            {#if idx < breadcrumbs.length - 1}
                <BreadcrumbSeparator/>
            {/if}
        {/each}
    </BreadcrumbList>
</Breadcrumb>

<svelte:boundary onerror={(e) => console.error(e)}>
    <Container>
        {@render children()}
    </Container>

    {#snippet pending()}
        <div>Loading...</div>
    {/snippet}
    {#snippet failed(e)}
        <div>Failed to load. {e}</div>
    {/snippet}
</svelte:boundary>
